export declare class TokenService {
    private keyStore;
    private rateLimiter;
    private tokenData;
    validateKey(key: string): string | null;
    isRateLimited(key: string, rateLimit: number): boolean;
    getTokenInfo(key: string): Promise<{
        id: string;
        symbol: string;
        name: string;
        price: number;
    } | {
        error: string;
    }>;
    updateKeyStore(event: any): void;
}
