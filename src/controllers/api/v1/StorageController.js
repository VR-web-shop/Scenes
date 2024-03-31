import express from 'express';

const router = express.Router();
const endpoint = process.env.S3_ENDPOINT_URL;

router.get('/assets/:s3_key', async (req, res) => {
    const s3_key = req.params.s3_key;
    const url = `${endpoint}/${s3_key}`;
    const image = await fetch(url);
    const buffer = await image.buffer
    res.send(buffer);
});

export default router;