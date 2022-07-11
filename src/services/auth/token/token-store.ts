import { StorageService } from 'app/services/storage/storage-service';
import { AuthTokenProvider } from 'app/services/http/contracts/auth-token-provider';

export class TokenStore implements AuthTokenProvider {
    public static readonly AUTH_TOKEN_KEY: string = 'access_token';

    public static readonly REFRESH_TOKEN_KEY: string = 'refresh_token';

    public static readonly TOKEN_STORAGE_POS_ID: string = 'pos_id';

    private storageService: StorageService;

    constructor(storageService: StorageService) {
        this.storageService = storageService;
    }

    setAuthToken(token: string): Promise<void> {
        return this.storageService.setItem(TokenStore.AUTH_TOKEN_KEY, token);
    }

    getAuthToken(): Promise<Nullable<string>> {
        return this.storageService.getItem(TokenStore.AUTH_TOKEN_KEY);
    }

    setRefreshToken(token: string): Promise<void> {
        return this.storageService.setItem(TokenStore.REFRESH_TOKEN_KEY, token);
    }

    getRefreshToken(): Promise<Nullable<string>> {
        return this.storageService.getItem(TokenStore.REFRESH_TOKEN_KEY);
    }

    setPosId(key: string) {
        return this.storageService.setItem(TokenStore.TOKEN_STORAGE_POS_ID, key);
    }

    getPosId(): Promise<Nullable<string>> {
        return this.storageService.getItem(TokenStore.TOKEN_STORAGE_POS_ID);
    }

    async clearTokens(): Promise<void[]> {
        return Promise.all([
            this.storageService.removeItem(TokenStore.AUTH_TOKEN_KEY),
            this.storageService.removeItem(TokenStore.REFRESH_TOKEN_KEY),
            this.storageService.removeItem(TokenStore.TOKEN_STORAGE_POS_ID),
        ]);
    }
}
