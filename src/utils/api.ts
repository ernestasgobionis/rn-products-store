import { HttpResponse } from 'app/services/http/contracts/http-response';

export class ApiUtils {
    static getResponseData(response: HttpResponse): SimpleObject {
        return response.data;
    }

    static getResponseResources<T>(response: HttpResponse): T[] {
        return response.data.data.resources;
    }

    static getFieldErrors(e: HttpResponse) {
        const fieldErrors: { [index: string]: string } = {};

        if (!e.data?.errors) {
            return fieldErrors;
        }

        Object.keys(e.data.errors).forEach((k) => {
            if (e.data.errors[k]) {
                // eslint-disable-next-line prefer-destructuring
                fieldErrors[k] = e.data.errors[k][0];
            }
        });

        return fieldErrors;
    }

    static removeEmptyRequestValues = (values: SimpleObject) => {
        const res = { ...values };

        Object.keys(res).forEach((k) => {
            if (typeof res[k] === 'string' && !res[k]) {
                delete res[k];
            }
        });

        return res;
    };
}
