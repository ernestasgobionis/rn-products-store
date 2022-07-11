import { UrlParams } from 'app/services/http/contracts/url-params';
import { QueryParams } from 'app/services/http/contracts/query-params';

export class UrlBuilder {
    static build(
        baseUrl: string,
        path: Nullable<string> = null,
        params: Nullable<UrlParams> = null,
        query: Nullable<QueryParams> = null,
    ): string {
        let url = UrlBuilder.constructUrl(baseUrl, path);

        if (query) {
            url += UrlBuilder.constructQuery(query);
        }

        if (!params) {
            return url;
        }

        Object.keys(params).forEach((key) => {
            url = url.replace(`:${key}`, params[key]);
        });

        return url;
    }

    static constructUrl(baseUrl: string, path: Nullable<string> = null): string {
        const normalizedBaseUrl = baseUrl.substr(-1) === '/' ? baseUrl.substr(0, baseUrl.length - 1) : baseUrl;

        if (path === null) {
            return normalizedBaseUrl;
        }

        const normalizedPath = path.substr(0, 1) === '/' ? path.substr(1, path.length) : path;

        if (path.match(/https?:/)) {
            return normalizedPath;
        }

        return `${normalizedBaseUrl}/${normalizedPath}`;
    }

    static constructQuery(query: QueryParams): string {
        const queryString = Object.keys(query)
            .reduce<[string, string][]>((params, key) => {
                const value = query[key];

                if (value === null || typeof value === 'undefined') {
                    return params;
                }

                if (Array.isArray(value)) {
                    value.forEach((v) => {
                        if (v === null || typeof v === 'undefined') {
                            return;
                        }

                        params.push([`${key}[]`, v]);
                    });

                    return params;
                }

                params.push([key, value]);

                return params;
            }, [])
            .map(([key, value]) => UrlBuilder.buildQueryValue(key, value))
            .join('&');

        return `?${queryString}`;
    }

    static encodeUriComponent(uriComponent: string): string {
        return encodeURIComponent(uriComponent)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    }

    private static buildQueryValue(key: string, value: string): string {
        return `${UrlBuilder.encodeUriComponent(key)}=${UrlBuilder.encodeUriComponent(value)}`;
    }
}
