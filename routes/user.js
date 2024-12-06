import express from "express";
import {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);
app.post("/getMyProfile", getMyProfile);

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.post("/logout", logout);

app.post("/searchUser", searchUser);

export default app;
