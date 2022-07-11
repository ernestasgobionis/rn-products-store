import { HttpClient } from 'app/services/http/client/http-client';
import { UrlParams } from 'app/services/http/contracts/url-params';
import { QueryParams } from 'app/services/http/contracts/query-params';
import { RequestOptions } from 'app/services/http/contracts/request-options';
import { RequestMethod } from 'app/services/http/contracts/request-method';
import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpMiddlewareManager } from 'app/services/http/middleware/http-middleware-manager';
import { HttpResponse } from 'app/services/http/contracts/http-response';
import { RequestOptionDefaults } from 'app/services/http/client/request-option-defaults';
import { ApiEndpoints } from 'app/constants/parameters';

export class HttpService {
    private httpClient: HttpClient;

    private middlewareManager: HttpMiddlewareManager;

    constructor(httpClient: HttpClient, middlewareManager: HttpMiddlewareManager) {
        this.httpClient = httpClient;
        this.middlewareManager = middlewareManager;
    }

    async get(
        endpoint: ApiEndpoints,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.request<void>(RequestMethod.GET, endpoint, null, params, query, options);
    }

    async post<T>(
        endpoint: ApiEndpoints,
        data: T,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.request<T>(RequestMethod.POST, endpoint, data, params, query, options);
    }

    async put<T>(
        endpoint: ApiEndpoints,
        data: T,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.request<T>(RequestMethod.PUT, endpoint, data, params, query, options);
    }

    async patch<T>(
        endpoint: ApiEndpoints,
        data: T,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.request<T>(RequestMethod.PATCH, endpoint, data, params, query, options);
    }

    async delete(
        endpoint: ApiEndpoints,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.request<void>(RequestMethod.DELETE, endpoint, null, params, query, options);
    }

    async request<T>(
        method: RequestMethod,
        endpoint: ApiEndpoints,
        data: Nullable<T> = null,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
        options: RequestOptions = {},
    ): Promise<HttpResponse> {
        return this.requestFromClaim<T>({
            method,
            endpoint,
            options,
            data: data ?? undefined,
            params: params ?? undefined,
            query: query ?? undefined,
            abortController: new AbortController(),
            attemptCount: 0,
        });
    }

    async requestFromClaim<T>(requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        const shouldUseMiddleware = requestClaim.options?.useMiddleware ?? RequestOptionDefaults.useMiddleware;

        if (shouldUseMiddleware) {
            return this.middlewareManager.apply<T>(this.httpClient.request<T>(requestClaim), requestClaim);
        }

        return this.httpClient.request<T>(requestClaim);
    }
}
