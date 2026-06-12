import express from "express";
import { connectDB } from "./database/db.js";
import router from "./routes/authroute.js";
import error from "./middleware/error.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productroute.js";
import orderRouter from "./routes/orderroute.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/auth/", router);
app.use("/api/product/", productRouter);
app.use("/api/order/", orderRouter);

app.use(error);

export default app;
