import express from "express";
import { connectDB } from "./database/db.js";
import router from "./routes/authroute.js";
import error from "./middleware/error.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productroute.js";
import orderRouter from "./routes/orderroute.js";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();

// app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  }),
);

app.use(
  cors({
    origin: "https://ecom-frontend-zeta-three.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: {
      fieldSize: 10 * 1024 * 1024,
      fileSize: 50 * 1024 * 1024,
    },
    abortOnLimit: true,
  }),
);

app.use("/api/auth/", router);
app.use("/api/product/", productRouter);
app.use("/api/order/", orderRouter);

app.use(error);

export default app;
