// eslint-disable-next-line
export interface RequestOptions<T extends SimpleObject = {}> {
    useAuth?: boolean;
    useMiddleware?: boolean;
    tag?: string;
    middlewareOptions?: T;
    authToken?: string;
}
