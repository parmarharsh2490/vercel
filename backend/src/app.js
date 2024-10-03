import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const app = express();
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.post('/api/v1/post/create', upload.any(), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          throw new Error(error.message);
        }
        return result;
      }).end(file.buffer);
    });

    const uploadResults = await Promise.all(uploadPromises);
    res.status(200).send(uploadResults);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('An error occurred during file upload.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;