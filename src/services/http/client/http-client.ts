import { Configuration } from 'app/services/http/contracts/configuration';
import { UrlParams } from 'app/services/http/contracts/url-params';
import { RequestConfig } from 'app/services/http/contracts/request-config';
import { UrlBuilder } from 'app/services/http/url/url-builder';
import { QueryParams } from 'app/services/http/contracts/query-params';
import { AuthTokenProvider } from 'app/services/http/contracts/auth-token-provider';
import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { RequestOptionDefaults } from 'app/services/http/client/request-option-defaults';
import { HttpResponse } from 'app/services/http/contracts/http-response';
import { HttpClientInterface } from 'app/services/http/contracts/http-client-interface';
import { HttpException } from 'app/services/http/exception/http-exception';
import { ApiEndpoints } from 'app/constants/parameters';
import { ApiUtils } from 'app/utils/api';

export class HttpClient implements HttpClientInterface {
    private readonly configuration: Configuration;

    private readonly tokenProvider: AuthTokenProvider;

    constructor(configuration: Configuration, tokenProvider: AuthTokenProvider) {
        this.configuration = configuration;
        this.tokenProvider = tokenProvider;
    }

    async request<T>(requestClaim: RequestClaim<T>): Promise<HttpResponse> {
        const request = await this.createRequest(requestClaim);

        return fetch(request.url, request)
            .then((response) => this.resolveStatus(response))
            .then((response) => this.handleSuccess(response))
            .catch((response) => this.handleError(response));
    }

    private async createRequest<T>(requestClaim: RequestClaim<T>): Promise<RequestConfig> {
        const headers = new Headers();

        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const url = this.resolveUrl(requestClaim.endpoint, requestClaim.params ?? null, requestClaim.query ?? null);
        const shouldUseAuth = requestClaim.options?.useAuth ?? RequestOptionDefaults.useAuth;

        if (shouldUseAuth) {
            await this.attachAuthHeaders(headers);
        }
        requestClaim.options?.authToken && headers.set('Authorization', `Bearer ${requestClaim.options?.authToken}`);

        return {
            url,
            headers,
            method: requestClaim.method,
            params: requestClaim.params ?? null,
            query: requestClaim.params ?? null,
            body: requestClaim.data === undefined ? undefined : JSON.stringify(requestClaim.data),
            signal: requestClaim.abortController?.signal,
        };
    }

    private resolveStatus(response: Response): Response {
        if (response.ok) {
            return response;
        }

        throw response;
    }

    private async handleSuccess(response: Response): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
            status: response.status,
            statusText: response.statusText,
            data: {},
        };

        if (response.status !== 204 && response.json) {
            try {
                httpResponse.data = await response.json();
            } catch (e) {
                httpResponse.data = {};
            }
        }

        return httpResponse;
    }

    private async handleError(response: Response & Error): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
            status: response.status,
            statusText: response.statusText,
            data: {},
        };

        if (response?.name === 'NetworkError' || response?.message === 'Network request failed') {
            httpResponse.data = new Error('No internet connection');
        } else if (response?.name === 'AbortError') {
            httpResponse.data = new Error('Internet connection interrupted');
        } else if (response?.json) {
            httpResponse.data = await response.json();

            const fieldErrors = ApiUtils.getFieldErrors(httpResponse);

            httpResponse.formErrors = {
                ...fieldErrors,
                formError: httpResponse.data?.message,
                message: httpResponse.data?.message,
            };
        }

        throw new HttpException(httpResponse);
    }

    private resolveUrl(endpoint: ApiEndpoints, params: Nullable<UrlParams>, query: Nullable<QueryParams>): string {
        const path = this.configuration.endpoints[endpoint];

        if (!path) {
            throw new Error(`Path for endpoint "${endpoint}" is not defined.`);
        }

        const { baseUrl } = this.configuration;

        if (!baseUrl) {
            throw new Error('Base URL is not defined.');
        }

        return UrlBuilder.build(baseUrl, path, params, query);
    }

    private async attachAuthHeaders(headers: Headers): Promise<void> {
        const token = await this.tokenProvider.getAuthToken();

        if (!token) {
            throw new Error('Cannot make authenticated request without authorization token.');
        }

        headers.set('Authorization', `Bearer ${token}`);
    }
}
