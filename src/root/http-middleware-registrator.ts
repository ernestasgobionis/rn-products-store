import { container } from 'app/services/container';
import { HttpMiddlewareManager } from 'app/services/http/middleware/http-middleware-manager';
import { RequestTimeoutMiddleware } from 'app/services/http-middleware/request-timeout-middleware';
import { RequestRepeatMiddleware } from 'app/services/http-middleware/request-repeat-middleware';
import { RefreshAuthTokenMiddleware } from 'app/services/http-middleware/refresh-auth-token-middleware';

export class HttpMiddlewareRegistrator {
    static register() {
        const httpMiddlewareManager = container.get<HttpMiddlewareManager>('HttpMiddlewareManager');

        httpMiddlewareManager.register(container.get<RequestTimeoutMiddleware>('RequestTimeoutMiddleware'));
        httpMiddlewareManager.register(container.get<RequestRepeatMiddleware>('RequestRepeatMiddleware'));
        httpMiddlewareManager.register(container.get<RefreshAuthTokenMiddleware>('RefreshAuthTokenMiddleware'));
    }
}
