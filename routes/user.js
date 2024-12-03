import express from "express";
import { login, newUser, getMyProfile } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);
app.post("/getMyProfile", getMyProfile);

export default app;
