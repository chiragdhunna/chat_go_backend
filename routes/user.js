import express from "express";
import {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);
app.post("/getMyProfile", getMyProfile);

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.post("/logout", logout);

app.get("/search", searchUser);

app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

export default app;
