# Chat GO Backend

This repository contains the backend services for the Chat GO application, handling user authentication, real-time messaging, media uploads, and data validations. It provides APIs and WebSocket-based communication to support the frontend functionality.

---

## Features

### Core Functionalities

- **User Authentication**: Secure login and registration.
- **WebSocket Integration**: Real-time messaging, typing indicators, and notifications.
- **Routes**: Comprehensive routing for users, chats, and admin operations.
- **Media Uploads**: Cloudinary integration for storing user profile pictures and media files.
- **Validations**: Robust input validation to ensure data integrity.
- **Error Handling**: Graceful error management with proper status codes and messages.
- **Seeding**: Utilities to seed users, groups, and messages for testing.
- **Swagger API Documentation**: Interactive API documentation via Swagger UI.

---

## Tech Stack

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: For building APIs.
- **Socket.IO**: For real-time communication.
- **Cloudinary**: For media storage and management.
- **MongoDB**: Database for storing user and chat data.
- **Swagger UI**: API documentation and testing.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)

### Steps to Run

1. **Clone the Repository**

   ```bash
   git clone git@github.com:chiragdhunna/chat_go_backend.git
   cd chat_go_backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI= YOUR_MONGO_URL
   PORT = 3000
   JWT_SECRET = YOUR_JWT_SECRET
   ADMIN_SECRET_KEY = YOUR_ADMIN_SECRET_KEY
   NODE_ENV = DEVELOPMENT || PRODUCTION
   CLIENT_URL =

   CLOUDINARY_CLOUD_NAME = YOUR_CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY = YOUR_CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_API_SECRET
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

5. **Access the Backend**
   The backend will run on `http://localhost:3000/` by default.

6. **View API Documentation (Swagger UI)**
   The API documentation can be accessed at:

   [Swagger UI Docs](https://chat-go-backend.onrender.com/api/v1/docs/)

---

## Folder Structure

```
chat_go_backend/
├── controllers/     # Business logic for routes
├── middleware/      # Middleware functions (e.g., auth, error handling)
├── models/          # Mongoose schemas and models
├── routes/          # API routes
├── seeders/         # Utilities for seeding data
├── utils/           # Utility functions and helpers
├── constants/       # Constants and configuration
├── app.js           # Main application logic
├── server.js        # Main server file
├── .env             # Environment variables
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

---

## APIs

### Authentication

- `POST /api/v1/user/register`: Register a new user.
- `POST /api/v1/user/login`: Authenticate a user.

### User Management

- `GET /api/v1/user/:id`: Fetch user profile.
- `PUT /api/v1/user/:id`: Update user profile.

### Chat and Messaging

- `POST /api/v1/chat/messages`: Send a message.
- `GET /api/v1/chat/messages/:chatId`: Fetch chat messages.

### Admin

- `GET /api/v1/admin/users`: Manage users.
- `GET /api/v1/admin/chats`: Manage chat groups.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---
