import express from "express";
import cloudinary from "./src/config/cloudinary.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouter from "./src/routers/authRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("Server is Working");
  res.send("Server is Running");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found ", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server Started at Port: ", port);
  connectDB();
  try {
    const res = await cloudinary.api.ping();
    console.log("Cloudinary API is Working :", res);
  } catch (error) {
    console.error("Error Connecting Cloudinary API :", error);
  }
});