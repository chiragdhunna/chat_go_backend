import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chats.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import { connectDB } from "./utils/features.js";
import {
  createGroupChats,
  createMessagesInAChat,
  createSingleChats,
} from "./seeders/chat.js";

dotenv.config({
  path: "./.env",
});

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "randomSecrectText";

connectDB(mongoUri);

// createSingleChats(10);
// createGroupChats(10);

// createMessagesInAChat("6756772632669ae35b65fccd", 50);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode}`);
});

export { adminSecretKey, envMode };
