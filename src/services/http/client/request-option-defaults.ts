import { RequestOptions } from 'app/services/http/contracts/request-options';

export class RequestOptionDefaults implements RequestOptions {
    static readonly useAuth = true;

    static readonly useMiddleware = true;
}
