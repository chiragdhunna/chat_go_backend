import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.post("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/getmembers", addMembers);

app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);

// Send Attachments
app.post("/message", attachmentMulter, sendAttachments);

// Get Messages
app.get("/message/:id", getMessages);

// Get Chat Details, rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
