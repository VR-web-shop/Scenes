import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import fs from 'fs';

const {
  S3_ENDPOINT_URL,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_REGION,
  S3_ENDPOINT_PROTOCOL,
  S3_CDN_URL
} = process.env;

const s3 = new S3Client({
  endpoint: `${S3_ENDPOINT_PROTOCOL}${S3_ENDPOINT_URL}`,
  region: S3_REGION, // Specify the appropriate region for your DigitalOcean Spaces
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  }
});

/**
 * @function uploadFile
 * @description Upload a file to an S3 bucket.
 * @param {Buffer} buffer - The buffer.
 * @param {string} keyName - The key name.
 * @returns {Promise}
 */
async function uploadFile(buffer, keyName) {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: keyName,
    Body: buffer
  };

  const command = new PutObjectCommand(params);

  try {
    const response = await s3.send(command);
    return `${S3_CDN_URL}/${keyName}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

/**
 * @function updateFile
 * @description Update a file in an S3 bucket.
 * @param {Buffer} buffer - The buffer
 * @param {string} keyName - The key name.
 * @returns {Promise}
 */
function updateFile(buffer, keyName) {
  return uploadFile(buffer, S3_BUCKET_NAME, keyName);
}

/**
 * @function deleteFile
 * @description Delete a file from an S3 bucket.
 * @param {string} keyName - The key name.
 * @returns {Promise}
 */
function deleteFile(keyName) {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: keyName
  };

  return s3.deleteObject(params).promise();
}

export default {
  uploadFile,
  updateFile,
  deleteFile
}
