import {PrismaClient} from "@prisma/client";
// import * as Minio from "minio";
import * as dotenv from "dotenv";

dotenv.config();

/* const minioEndpoint = process.env.MINIO_ENDPOINT;
const minioPort = parseInt(process.env.MINIO_PORT, 10);
const minioAccessKey = process.env.MINIO_ACCESS_KEY;
const minioSecretKey = process.env.MINIO_SECRET_KEY;
 */
export const prismaClient = new PrismaClient();
/* export const minioClient = new Minio.Client({
    endPoint: minioEndpoint,
    port: minioPort,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
    useSSL: false,
}); */
