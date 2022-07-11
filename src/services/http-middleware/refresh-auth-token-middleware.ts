import { HttpMiddleware } from 'app/services/http/contracts/http-middleware';
import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpService } from 'app/services/http/service/http-service';
import { HttpResponse } from 'app/services/http/contracts/http-response';
import { TokenRefreshFailureHandler } from 'app/services/auth/token/token-refresh-failure-handler';
import { HttpException } from 'app/services/http/exception/http-exception';
import { HttpMiddlewareOptions } from 'app/services/http-middleware/contracts/http-middleware-options';
import { TokenManager } from 'app/services/auth/token/token-manager';

export class RefreshAuthTokenMiddleware implements HttpMiddleware {
    private httpService: HttpService;
    private tokenManager: TokenManager;
    private tokenRefreshFailureHandler: TokenRefreshFailureHandler;

    constructor(
        httpService: HttpService,
        tokenManager: TokenManager,
        tokenRefreshFailureHandler: TokenRefreshFailureHandler,
    ) {
        this.httpService = httpService;
        this.tokenManager = tokenManager;
        this.tokenRefreshFailureHandler = tokenRefreshFailureHandler;
    }

    async apply<T>(
        requestPromise: Promise<HttpResponse>,
        requestClaim: RequestClaim<T, HttpMiddlewareOptions>,
    ): Promise<HttpResponse> {
        return requestPromise.catch((error: HttpException) => {
            if (requestClaim.options?.useAuth === false) {
                throw error;
            }

            if (requestClaim.options?.middlewareOptions?.skipRefreshTokenMiddleware) {
                throw error;
            }

            if (error.response && error.response.status === 401) {
                return this.tokenManager
                    .refreshToken()
                    .catch(() => {
                        return this.tokenRefreshFailureHandler.handle(error);
                    })
                    .then(() => {
                        return this.httpService.requestFromClaim(requestClaim);
                    });
            }

            throw error;
        });
    }
}
