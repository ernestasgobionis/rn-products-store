import jwtDecode from 'jwt-decode';

export class TokenDecoder {
    static decode(token: string): SimpleObject {
        return jwtDecode(token);
    }
}
