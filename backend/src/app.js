import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.post('/api/v1/post/create', upload.any(), (req, res) => {
  try {
    console.log('Files:', req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    res.status(200).send('Files uploaded successfully.');
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('An error occurred during file upload.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;