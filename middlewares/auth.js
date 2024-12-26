import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { CHATGO_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies[CHATGO_TOKEN];
  console.log("Cookie :  ", token);

  if (!token) {
    console.log("No token found, redirecting to login...");
    return next(new ErrorHandler("Please Login to Access this route", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;

  next();
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["chatgo-admin-token"];
  console.log("Cookie :  ", token);

  if (!token) {
    console.log("No token found, redirecting to login...");
    return next(new ErrorHandler("Only Admin can Access this route", 401));
  }

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatch = secretKey === adminSecretKey;

  if (!isMatch)
    return next(new ErrorHandler("Only Admin can Access this route", 401));

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATGO_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
