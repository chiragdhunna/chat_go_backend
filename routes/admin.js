import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

/**
 * @swagger
 * /api/v1/admin/verify:
 *   post:
 *     summary: Admin login authentication
 *     description: Authenticates an admin using a secret key and sets an authentication cookie.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secretKey:
 *                 type: string
 *                 description: The secret key for admin authentication
 *     responses:
 *       200:
 *         description: Successfully authenticated and token set in cookie
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
 *                   example: "Authenticated Successfully, Welcome"
 *       401:
 *         description: Unauthorized - Invalid admin key
 *       500:
 *         description: Internal Server Error
 */
app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

/**
 * @swagger
 * /api/v1/admin/logout:
 *   get:
 *     summary: Admin logout
 *     description: Logs out the admin by clearing the authentication cookie.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: "Logged Out Successfully"
 *       500:
 *         description: Internal Server Error
 */
app.get("/logout", adminLogout);

// Only Admin Can Access these Routes

app.use(adminOnly);

/**
 * @swagger
 * /api/v1/admin/:
 *   get:
 *     summary: Get admin data
 *     description: Verifies if the user is an admin.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: boolean
 *                   example: true
 *       403:
 *         description: Forbidden - Access restricted to admins only
 *       500:
 *         description: Internal Server Error
 */
app.get("/", getAdminData);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all registered users along with their stats.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User ID
 *                       name:
 *                         type: string
 *                         description: Full name of the user
 *                       username:
 *                         type: string
 *                         description: Unique username of the user
 *                       avatar:
 *                         type: string
 *                         format: uri
 *                         description: URL of the user's avatar
 *                       groups:
 *                         type: integer
 *                         description: Number of groups the user is in
 *                       friends:
 *                         type: integer
 *                         description: Number of private chats the user has
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal Server Error
 */
app.get("/users", allUsers);

/**
 * @swagger
 * /api/v1/admin/chats:
 *   get:
 *     summary: Get all chats
 *     description: Retrieves all chat groups and direct messages along with member details.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all chats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 chats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Chat ID
 *                       name:
 *                         type: string
 *                         description: Chat name (for group chats)
 *                       groupChat:
 *                         type: boolean
 *                         description: Indicates if it's a group chat
 *                       avatar:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: uri
 *                         description: Array of avatar URLs for group members
 *                       totalMembers:
 *                         type: integer
 *                         description: Total number of members in the chat
 *                       totalMessages:
 *                         type: integer
 *                         description: Total messages in the chat
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal Server Error
 */
app.get("/chats", allChats);

/**
 * @swagger
 * /api/v1/admin/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieves all messages across chats.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
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
 *                         description: Text content of the message (optional)
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
 *                         description: ID of the chat where the message belongs
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal Server Error
 */
app.get("/messages", allMessages);

/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get admin dashboard stats
 *     description: Retrieves various statistics for the admin dashboard.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stats:
 *                   type: object
 *                   properties:
 *                     groupsCount:
 *                       type: integer
 *                     usersCount:
 *                       type: integer
 *                     messagesCount:
 *                       type: integer
 *                     totalChatsCount:
 *                       type: integer
 *                     messagesChart:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         description: Number of messages sent in the last 7 days
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal Server Error
 */
app.get("/stats", getDashboardStats);

export default app;
