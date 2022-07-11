import { HttpResponse } from 'app/services/http/contracts/http-response';

export class HttpException extends Error {
    public readonly response: HttpResponse;

    public handled = false;

    constructor(response: HttpResponse) {
        super(response.statusText);

        this.response = response;
    }

    setHandled(): this {
        this.handled = true;

        return this;
    }
}
