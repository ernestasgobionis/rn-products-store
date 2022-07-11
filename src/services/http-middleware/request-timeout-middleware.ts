import { HttpMiddleware } from 'app/services/http/contracts/http-middleware';
import { HttpResponse } from 'app/services/http/contracts/http-response';
import { TimeoutException } from 'app/services/http-middleware/exception/timeout-exception';
import { RequestClaim } from 'app/services/http/contracts/request-claim';

export class RequestTimeoutMiddleware implements HttpMiddleware {
    static readonly TIMEOUT = 15000;

    apply<T>(requestPromise: Promise<HttpResponse>, requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        return Promise.race([this.createTimoutPromise(), requestPromise]).catch((error) => {
            if (error.timeout && requestClaim.abortController) {
                requestClaim.abortController.abort();
            }

            throw error;
        });
    }

    private createTimoutPromise(): Promise<HttpResponse> {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new TimeoutException()), RequestTimeoutMiddleware.TIMEOUT);
        });
    }
}
