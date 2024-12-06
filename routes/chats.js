import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

export default app;
