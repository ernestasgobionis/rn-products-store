import { RequestClaim } from 'app/services/http/contracts/request-claim';
import { HttpResponse } from 'app/services/http/contracts/http-response';

export interface HttpClientInterface {
    request<T>(requestClaim: RequestClaim<T>): Promise<HttpResponse>;
}
