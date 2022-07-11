import { Definition, ServiceConstructor } from 'app/services/container/definition';
import { ContainerException } from 'app/services/container/exceptions/container-exception';

export class Container {
    private readonly container: { [key: string]: Definition<any> } = {};

    register(name: string, concrete: ServiceConstructor<any>, dependencies: string[] = []): void {
        this.container[name] = {
            concrete,
            dependencies,
        };
    }

    registerValue(name: string, value: any): void {
        this.container[name] = {
            value,
        };
    }

    has(name: string): boolean {
        return name in this.container;
    }

    get<T>(name: string): T {
        if (!this.has(name)) {
            throw new ContainerException(`Service "${name}" is not registered.`);
        }

        const definition = this.container[name];

        if (definition.instance) {
            return definition.instance;
        }

        if (!definition.concrete) {
            throw new Error('Concrete implementation cannot be undefined or null.');
        }

        if (!definition.dependencies) {
            throw new Error('Dependencies cannot be undefined or null.');
        }

        const resolvedDependencies = definition.dependencies.map((dependency) => {
            const value = this.getValue(dependency);

            if (value) {
                return value;
            }

            return this.get(dependency);
        });

        const ConcreteService = definition.concrete;

        definition.instance = new ConcreteService(...resolvedDependencies) as T;

        return definition.instance;
    }

    getValue<T>(name: string): T {
        if (!this.has(name)) {
            throw new ContainerException(`Value "${name}" is not registered.`);
        }

        const definition = this.container[name];

        return definition.value;
    }
}

export const container = new Container();
