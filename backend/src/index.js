import { connectDB } from "./DB/index.js";
import app from "./app.js";

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

connectDB()
  .then(async () => {
    await startServer();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });
