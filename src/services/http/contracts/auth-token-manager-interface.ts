export interface AuthTokenManagerInterface {
    refreshToken(): Promise<boolean>;
}
