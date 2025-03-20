import express from "express";
import {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

/**
 * @swagger
 * /api/v1/user/new:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *               - name
 *               - username
 *               - password
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: User avatar image file
 *               name:
 *                 type: string
 *                 description: User's name
 *               username:
 *                 type: string
 *                 description: Unique username for the user
 *               password:
 *                 type: string
 *                 description: User's password
 *               bio:
 *                 type: string
 *                 description: Short bio of the user (optional)
 *     responses:
 *       201:
 *         description: User created successfully
 */
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
app.post("/login", loginValidator(), validateHandler, login);

/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
app.get("/me", isAuthenticated, getMyProfile);

/**
 * @swagger
 * /api/v1/user/logout:
 *   get:
 *     summary: Logout user
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
app.get("/logout", isAuthenticated, logout);

/**
 * @swagger
 * /api/v1/user/search:
 *   get:
 *     summary: Search for users
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name to search for
 *     responses:
 *       200:
 *         description: List of matching users
 */
app.get("/search", isAuthenticated, searchUser);

/**
 * @swagger
 * /api/v1/user/sendrequest:
 *   put:
 *     summary: Send a friend request
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend request sent successfully
 */
app.put(
  "/sendrequest",
  isAuthenticated,
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

/**
 * @swagger
 * /api/v1/user/acceptrequest:
 *   put:
 *     summary: Accept a friend request
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *               accept:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Friend request accepted or rejected successfully
 */
app.put(
  "/acceptrequest",
  isAuthenticated,
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

/**
 * @swagger
 * /api/v1/user/notifications:
 *   get:
 *     summary: Get user's notifications
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
app.get("/notifications", isAuthenticated, getMyNotifications);

/**
 * @swagger
 * /api/v1/user/friends:
 *   get:
 *     summary: Get user's friends
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of friends
 */
app.get("/friends", isAuthenticated, getMyFriends);

export default app;
