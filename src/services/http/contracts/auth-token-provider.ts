export interface AuthTokenProvider {
    getAuthToken(): Promise<Nullable<string>>;
}
