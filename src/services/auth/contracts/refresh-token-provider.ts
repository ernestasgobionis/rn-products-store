export interface RefreshTokenProvider {
    getRefreshToken(): Promise<Nullable<string>>;
}
