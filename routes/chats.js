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
import {
  newGroupValidator,
  addMemberValidator,
  validateHandler,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator,
} from "../lib/validators.js";

const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);

/**
 * @swagger
 * /api/v1/chat/new:
 *   post:
 *     summary: Create a new group chat
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group chat
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs to be added to the group
 *     responses:
 *       201:
 *         description: Group chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Group Created"
 *       400:
 *         description: Invalid request parameters
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal Server Error
 */
app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

/**
 * @swagger
 * /api/v1/chat/my:
 *   get:
 *     summary: Get user's chats
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user's chats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 chats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Chat ID
 *                       groupChat:
 *                         type: boolean
 *                         description: Indicates if the chat is a group chat
 *                       avatar:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Array of avatar URLs (for groups or single user chat)
 *                       name:
 *                         type: string
 *                         description: Chat name (group name or other member's name)
 *                       members:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of member user IDs (excluding the requesting user)
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal Server Error
 */
app.get("/my", getMyChats);

/**
 * @swagger
 * /api/v1/chat/my/groups:
 *   get:
 *     summary: Get user's groups
 *     description: Retrieves a list of group chats where the user is the creator.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user's groups
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Group chat ID
 *                       groupChat:
 *                         type: boolean
 *                         description: Indicates if it is a group chat (always `true` in this case)
 *                       name:
 *                         type: string
 *                         description: Group chat name
 *                       avatar:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of up to 3 avatar URLs from group members
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal Server Error
 */
app.get("/my/groups", getMyGroups);

/**
 * @swagger
 * /api/v1/chat/addmembers:
 *   put:
 *     summary: Add members to a group
 *     description: Allows the group creator to add new members to an existing group chat.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - members
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the group chat
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to be added
 *     responses:
 *       200:
 *         description: Members added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Members added successfully"
 *       400:
 *         description: Bad request (e.g., chat is not a group, member limit exceeded)
 *       403:
 *         description: Forbidden - Only the group creator can add members
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 */
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

/**
 * @swagger
 * /api/v1/chat/removemember:
 *   put:
 *     summary: Remove a member from a group
 *     description: Allows the group creator to remove a member from an existing group chat.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - chatId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to be removed
 *               chatId:
 *                 type: string
 *                 description: The ID of the group chat
 *     responses:
 *       200:
 *         description: Member removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Member removed successfully"
 *       400:
 *         description: Bad request (e.g., not a group chat, group must have at least 3 members)
 *       403:
 *         description: Forbidden - Only the group creator can remove members
 *       404:
 *         description: Not found - Chat or user does not exist
 *       500:
 *         description: Internal Server Error
 */
app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

/**
 * @swagger
 * /api/v1/chat/leave/{id}:
 *   delete:
 *     summary: Leave a group
 *     description: Allows a user to leave a group chat. If the user is the group creator, ownership is transferred to a random remaining member.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the group chat
 *     responses:
 *       200:
 *         description: Successfully left the group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Leave Group Successfully"
 *       400:
 *         description: Bad request (e.g., not a group chat, group must have at least 3 members)
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 */
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

/**
 * @swagger
 * /api/v1/chat/message:
 *   post:
 *     summary: Send attachments in chat
 *     description: Allows users to send file attachments in a chat. Supports up to 5 files.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - files
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat where the attachments will be sent
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of files (maximum 5)
 *     responses:
 *       200:
 *         description: Attachments sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Message ID
 *                     content:
 *                       type: string
 *                       description: Text content of the message (empty if only attachments)
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       description: List of attachment URLs
 *                     sender:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Sender's user ID
 *                         name:
 *                           type: string
 *                           description: Sender's name
 *                     chat:
 *                       type: string
 *                       description: ID of the chat where the message was sent
 *       400:
 *         description: Bad request (e.g., no files provided, more than 5 files)
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 */
app.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

/**
 * @swagger
 * /api/v1/chat/message/{id}:
 *   get:
 *     summary: Get messages in a chat
 *     description: Retrieves messages from a specific chat. Supports pagination.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for paginated results (default is 1)
 *     responses:
 *       200:
 *         description: List of messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Message ID
 *                       content:
 *                         type: string
 *                         description: Text content of the message (if any)
 *                       attachments:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: uri
 *                         description: List of attachment URLs (if any)
 *                       sender:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Sender's user ID
 *                           name:
 *                             type: string
 *                             description: Sender's name
 *                           avatar:
 *                             type: string
 *                             format: uri
 *                             description: Sender's avatar URL
 *                       chat:
 *                         type: string
 *                         description: Chat ID where the message belongs
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of message creation
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available for pagination
 *       400:
 *         description: Bad request (invalid parameters)
 *       403:
 *         description: Forbidden - User does not have access to this chat
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 */
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   get:
 *     summary: Get chat details
 *     description: Retrieves details of a chat by its ID. Optionally populates members if `populate=true` is passed as a query parameter.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Whether to populate members' details
 *     responses:
 *       200:
 *         description: Chat details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 chat:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Chat ID
 *                     name:
 *                       type: string
 *                       description: Chat name (if a group chat)
 *                     groupChat:
 *                       type: boolean
 *                       description: Indicates if the chat is a group chat
 *                     members:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: User ID
 *                           name:
 *                             type: string
 *                             description: User name
 *                           avatar:
 *                             type: string
 *                             format: uri
 *                             description: User avatar URL
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Rename a group chat
 *     description: Allows the group creator to rename a group chat.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the group chat
 *     responses:
 *       200:
 *         description: Chat renamed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Group renamed successfully"
 *       400:
 *         description: Bad request (not a group chat)
 *       403:
 *         description: Forbidden - Only the group creator can rename the chat
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete a chat
 *     description: Deletes a chat if the requester has permission. Group creators can delete groups, and users can delete private chats they are part of.
 *     tags: [Chat]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Chat deleted successfully"
 *       403:
 *         description: Forbidden - User is not allowed to delete this chat
 *       404:
 *         description: Not found - Chat does not exist
 *       500:
 *         description: Internal Server Error
 */
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
