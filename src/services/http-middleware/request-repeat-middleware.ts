import { HttpMiddleware } from 'app/services/http/contracts/http-middleware';
import { HttpException } from 'app/services/http/exception/http-exception';
import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpService } from 'app/services/http/service/http-service';
import { HttpResponse } from 'app/services/http/contracts/http-response';

export class RequestRepeatMiddleware implements HttpMiddleware {
    static readonly RETRY_DELAY_BASE = 1000;

    static readonly RETRY_COUNT = 5;

    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    apply<T>(requestPromise: Promise<HttpResponse>, requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        return requestPromise.catch((error: HttpException) => {
            if (!error.response?.status) {
                return this.createRetryPromise(error, requestClaim);
            }

            throw error;
        });
    }

    private createRetryPromise<T>(error: Error, requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        const attemptCount = requestClaim.attemptCount ?? 0;

        if (attemptCount >= RequestRepeatMiddleware.RETRY_COUNT) {
            throw error;
        }

        return this.createDelayPromise(requestClaim).then(() => {
            return this.httpService.requestFromClaim({
                ...requestClaim,
                attemptCount: attemptCount + 1,
            });
        });
    }

    private createDelayPromise<T>(requestClaim: RequestClaim<T>): Promise<void> {
        const attemptCount = requestClaim.attemptCount ?? 0;

        return new Promise((resolve) => {
            setTimeout(resolve, RequestRepeatMiddleware.RETRY_DELAY_BASE * attemptCount);
        });
    }
}
