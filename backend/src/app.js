import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Create __filename equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);

const app = express();
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use the '/tmp' directory for temporary file storage
const uploadDir = '/tmp';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Increase payload size limit
app.use(express.json({ limit: '100mb' })); // Increase limit to 100MB
app.use(express.urlencoded({ limit: '100mb', extended: true })); // Increase limit to 100MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the '/tmp' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024, files: 100 } // 50MB limit per file, 100 files
});

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.post('/api/v1/post/create', upload.any(), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Delete the file from the disk after uploading
            fs.unlink(file.path, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
            resolve(result);
          }
        });
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    res.status(200).json(uploadResults); // Sends a 200 OK response with the upload results
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).send('An error occurred during file upload.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;