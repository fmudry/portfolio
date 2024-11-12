declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        MINIO_ENDPOINT: string;
        MINIO_PORT: string;
        MINIO_ACCESS_KEY: string;
        MINIO_SECRET_KEY: string;
        BACKEND_PORT: string;
        REDIS_URL: string;
        NODE_ENV: "dev" | "production";
        DATADIR: string;
        WEBSOCKET_PORT: string;
    }
}
