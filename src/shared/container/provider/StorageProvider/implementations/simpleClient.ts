import { S3Client } from "@aws-sdk/client-s3";

require('dotenv').config()

const REGION = process.env.AWS_BUCKET_REGION

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
s3Client.destroy

export { s3Client };