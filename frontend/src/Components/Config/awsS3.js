import AWS from "aws-sdk";
import S3, { Object } from "aws-sdk/clients/s3";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectRequest,
} from "@aws-sdk/client-s3";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
const REGION = process.env.REACT_APP_S3_BUCKET_REGION;

const credentials = {
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
};

AWS.config.update(credentials);

const uploadToS3 = async (userFile, name) => {
  console.log("Uploading to S3");
  console.log("Name: ", name);
  console.log("File: ", userFile);
  console.log("Bucket: ", S3_BUCKET);
  console.log("Region: ", REGION);

  const s3 = new S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: name,
    Body: userFile,
  };

  try {
    let promise = s3.putObject(params).promise();
    await promise;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteFromS3 = async (name) => {
  const s3 = new S3Client({
    params: { Bucket: S3_BUCKET },
    region: REGION,
    credentials: credentials,
  });

  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: name,
  });

  try {
    const promise = s3.send(command);
    await promise;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { uploadToS3, deleteFromS3 };
