import { S3 } from '@aws-sdk/client-s3';
import fs from 'fs';

const {
    S3_ENDPOINT_URL,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME,
    S3_REGION
} = process.env;

const s3 = new S3({
    endpoint: S3_ENDPOINT_URL,
    region: S3_REGION, // Specify the appropriate region for your DigitalOcean Spaces
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY
    }
  });

/**
 * @function uploadFile
 * @description Upload a file to an S3 bucket.
 * @param {string} filePath - The file path.
 * @param {string} keyName - The key name.
 * @returns {Promise}
 */
function uploadFile(filePath, keyName) {
  const fileStream = fs.createReadStream(filePath);
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: keyName,
    Body: fileStream
  };

  return s3.upload(params).promise();
}

/**
 * @function updateFile
 * @description Update a file in an S3 bucket.
 * @param {string} filePath - The file path.
 * @param {string} keyName - The key name.
 * @returns {Promise}
 */
function updateFile(filePath, keyName) {
  return uploadFile(filePath, S3_BUCKET_NAME, keyName);
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
