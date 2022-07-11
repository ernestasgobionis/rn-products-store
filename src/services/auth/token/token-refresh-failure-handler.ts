import { HttpResponse } from 'app/services/http/contracts/http-response';
import { HttpException } from 'app/services/http/exception/http-exception';

export class TokenRefreshFailureHandler {
    handle(error: HttpException): Promise<HttpResponse> {
        throw error.setHandled();
    }
}
