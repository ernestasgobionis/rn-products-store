export interface ServiceConstructor<T> {
    new (...args: any[]): T;
}

export interface Definition<T> {
    concrete?: ServiceConstructor<T>;
    dependencies?: string[];
    instance?: T;
    value?: any;
}
