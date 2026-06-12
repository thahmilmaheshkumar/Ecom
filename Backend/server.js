import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRETE, // Click 'View API Keys' above to copy your API secret
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
