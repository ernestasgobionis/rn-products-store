import { container } from 'app/services/container';
import { parameters } from 'app/constants/parameters';
import { HttpClient } from 'app/services/http/client/http-client';
import { HttpMiddlewareManager } from 'app/services/http/middleware/http-middleware-manager';
import { HttpService } from 'app/services/http/service/http-service';
import { MemoryCacheService } from 'app/services/cache/memory-cache-service';
import { StorageService } from 'app/services/storage/storage-service';
import { TokenStore } from 'app/services/auth/token/token-store';
import { RequestRepeatMiddleware } from 'app/services/http-middleware/request-repeat-middleware';
import { RequestTimeoutMiddleware } from 'app/services/http-middleware/request-timeout-middleware';
import { TokenManager } from 'app/services/auth/token/token-manager';
import { TokenRefreshFailureHandler } from 'app/services/auth/token/token-refresh-failure-handler';
import { RefreshAuthTokenMiddleware } from 'app/services/http-middleware/refresh-auth-token-middleware';
import registerScreens from 'app/screens';

export class ContainerBuilder {
    static build() {
        container.registerValue('apiConfiguration', parameters.api);
        container.register('MemoryCacheService', MemoryCacheService);
        container.register('StorageService', StorageService, ['MemoryCacheService']);
        container.register('TokenStore', TokenStore, ['StorageService']);
        container.register('HttpClient', HttpClient, ['apiConfiguration', 'TokenStore']);
        container.register('HttpMiddlewareManager', HttpMiddlewareManager);
        container.register('HttpService', HttpService, ['HttpClient', 'HttpMiddlewareManager']);
        container.register('TokenManager', TokenManager, ['TokenStore', 'HttpClient']);
        container.register('TokenRefreshFailureHandler', TokenRefreshFailureHandler);
        container.register('RefreshAuthTokenMiddleware', RefreshAuthTokenMiddleware, [
            'HttpService',
            'TokenManager',
            'TokenRefreshFailureHandler',
            'TokenStore',
        ]);

        container.register('RequestTimeoutMiddleware', RequestTimeoutMiddleware);
        container.register('RequestRepeatMiddleware', RequestRepeatMiddleware, ['HttpService']);

        registerScreens();
    }
}
