export class MemoryCacheService {
    private readonly cache: SimpleObject = {};

    async put(key: string, value: string): Promise<void> {
        this.cache[key] = value;
    }

    async retrieve(key: string): Promise<string> {
        const value = this.cache[key];

        if (value === undefined) {
            throw new Error(`Cache value for key ${key} was not found.`);
        }

        return value;
    }

    async remove(key: string): Promise<void> {
        delete this.cache[key];
    }
}
