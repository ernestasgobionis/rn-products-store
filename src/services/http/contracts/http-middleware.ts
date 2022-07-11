import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpResponse } from 'app/services/http/contracts/http-response';

export interface HttpMiddleware {
    apply<T>(requestPromise: Promise<HttpResponse>, requestClaim: RequestClaim<T>): Promise<HttpResponse>;
}
