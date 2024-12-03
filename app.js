import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({
  path: "./.env",
});

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connectDB(mongoUri);

const app = express();

app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server Started on port 3000");
});
