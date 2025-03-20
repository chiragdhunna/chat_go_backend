/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *         bio:
 *           type: string
 *           description: User's bio
 *         username:
 *           type: string
 *           description: Unique username of the user
 *         avatar:
 *           type: object
 *           properties:
 *             public_id:
 *               type: string
 *               description: Public ID of the avatar in cloud storage
 *             url:
 *               type: string
 *               format: uri
 *               description: URL of the user's avatar
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the chat
 *         name:
 *           type: string
 *           description: Chat name (for group chats)
 *         groupChat:
 *           type: boolean
 *           description: Indicates if this is a group chat
 *         creator:
 *           type: string
 *           description: ID of the user who created the group
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs who are part of this chat
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Chat creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the message
 *         content:
 *           type: string
 *           description: Text content of the message (optional)
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *                 description: Public ID of the file in cloud storage
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the attachment
 *           description: List of file attachments in the message
 *         sender:
 *           type: string
 *           description: ID of the user who sent the message
 *         chat:
 *           type: string
 *           description: ID of the chat to which this message belongs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Message creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the friend request
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *           description: Status of the request
 *           example: "pending"
 *         sender:
 *           type: string
 *           description: ID of the user who sent the request
 *         receiver:
 *           type: string
 *           description: ID of the user who received the request
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the request was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Action completed successfully"
 */
