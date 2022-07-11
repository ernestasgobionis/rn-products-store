import AsyncStorage from '@react-native-community/async-storage';

import { MemoryCacheService } from 'app/services/cache/memory-cache-service';

export class StorageService {
    private cacheService: MemoryCacheService;

    constructor(cacheService: MemoryCacheService) {
        this.cacheService = cacheService;
    }

    async setItem(key: string, value: string): Promise<void> {
        let cachedValue = null;

        try {
            cachedValue = await this.cacheService.retrieve(key);
        } catch (_) {}

        if (cachedValue !== value) {
            return Promise.all([AsyncStorage.setItem(key, value), this.cacheService.put(key, value)]).then();
        }
    }

    async getItem(key: string): Promise<Nullable<string>> {
        try {
            return await this.cacheService.retrieve(key);
        } catch (e) {
            const value = await AsyncStorage.getItem(key);

            if (value === null) {
                return value;
            }

            await this.cacheService.put(key, value);

            return value;
        }
    }

    async removeItem(key: string): Promise<void> {
        return Promise.all([AsyncStorage.removeItem(key), this.cacheService.remove(key)]).then();
    }
}
