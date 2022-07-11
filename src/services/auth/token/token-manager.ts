import { TokenStore } from 'app/services/auth/token/token-store';
import { AuthTokenManagerInterface } from 'app/services/http/contracts/auth-token-manager-interface';
import { RequestMethod } from 'app/services/http/contracts/request-method';
import { HttpClient } from 'app/services/http/client/http-client';

export class TokenManager implements AuthTokenManagerInterface {
    private refreshRequest: Nullable<Promise<boolean>> = null;

    private tokenStore: TokenStore;

    private httpClient: HttpClient;

    constructor(tokenStore: TokenStore, httpClient: HttpClient) {
        this.tokenStore = tokenStore;
        this.httpClient = httpClient;
    }

    async refreshToken(): Promise<boolean> {
        const refreshToken = await this.tokenStore.getRefreshToken();

        if (this.refreshRequest !== null) {
            return this.refreshRequest;
        }

        this.refreshRequest = this.httpClient
            .request({
                method: RequestMethod.POST,
                endpoint: 'refresh-token',
                data: {
                    refresh_token: refreshToken ?? '',
                },
                options: {
                    useMiddleware: false,
                    useAuth: false,
                },
            })
            .then((response) => {
                return Promise.all([
                    this.tokenStore.setAuthToken(response.data.data.token),
                    this.tokenStore.setRefreshToken(response.data.data.refreshToken),
                ]);
            })
            .then(() => {
                this.refreshRequest = null;

                return true;
            })
            .catch((error) => {
                this.refreshRequest = null;

                throw error;
            });

        return this.refreshRequest;
    }
}
