import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "@config";

const REGION = "us-west-2";
const BUCKET_NAME = config.AWS_S3_PUBLIC_STATIC_BUCKET_NAME;

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID!,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY!
    }
});

export const uploadStaticToS3 = async (fileName: string, fileContent: Buffer, mimetype: string): Promise<void> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: mimetype,
        CacheControl: "max-age: 31536000, immutable"
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log(`Successfully uploaded ${fileName} to ${BUCKET_NAME}.`);
    } catch (error) {
        console.error(`Error uploading file: ${fileName} to S3:`, error);
    }
};

export const deleteStaticFromS3 = async (fileName: string): Promise<boolean> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
    };

    try {
        await s3Client.send(new DeleteObjectCommand(params));
        console.log(`Successfully deleted ${fileName} from ${BUCKET_NAME}.`);
        return true;
    } catch (error) {
        console.error(`Error deleting file: ${fileName} from S3:`, error);
        return false;
    }
};
