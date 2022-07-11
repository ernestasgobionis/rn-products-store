import { UrlParams } from 'app/services/http/contracts/url-params';
import { QueryParams } from 'app/services/http/contracts/query-params';

export interface RequestConfig extends RequestInit {
    url: string;
    params: Nullable<UrlParams>;
    query: Nullable<QueryParams>;
}
