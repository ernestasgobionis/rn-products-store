import { UrlParams } from 'app/services/http/contracts/url-params';
import { QueryParams } from 'app/services/http/contracts/query-params';
import { RequestOptions } from 'app/services/http/contracts/request-options';
import { RequestMethod } from 'app/services/http/contracts/request-method';
import { ApiEndpoints } from 'app/constants/parameters';

export interface RequestClaim<T, O = SimpleObject> {
    endpoint: ApiEndpoints;
    method: RequestMethod;
    data?: T;
    params?: UrlParams;
    query?: QueryParams;
    options?: RequestOptions<O>;
    abortController?: AbortController;
    attemptCount?: number;
}
