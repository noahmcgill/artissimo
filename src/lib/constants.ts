export const USER_METADATA_COOKIES_KEY = "user.metadata";

export enum TRPCErrorCode {
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    BAD_REQUEST = "BAD_REQUEST",
}

export const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
