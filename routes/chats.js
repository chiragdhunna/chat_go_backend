import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getMembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
} from "../controllers/chat.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.post("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.post("/getMembers", getMembers);

export default app;
