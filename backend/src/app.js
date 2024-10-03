import express from 'express';
const app = express();
import multer from 'multer';
import cors from "cors"

app.use(cors());

import path from 'path'; // Ensure this is imported

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
  }
});


const upload = multer({ storage: storage });

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.post("/api/v1/post/create",upload.any(),(req,res) => {
  console.log("here");
  
  res.status(200).json(req?.files)
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

  export default app;
