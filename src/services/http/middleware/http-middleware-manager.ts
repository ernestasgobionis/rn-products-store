import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpMiddleware } from 'app/services/http/contracts/http-middleware';
import { HttpResponse } from 'app/services/http/contracts/http-response';

export class HttpMiddlewareManager {
    private readonly middlewareStack: HttpMiddleware[] = [];

    register(middleware: HttpMiddleware): void {
        this.middlewareStack.push(middleware);
    }

    apply<T>(requestPromise: Promise<HttpResponse>, requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        return this.middlewareStack.reduce((promise, next) => {
            return next.apply<T>(promise, requestClaim);
        }, requestPromise);
    }
}
