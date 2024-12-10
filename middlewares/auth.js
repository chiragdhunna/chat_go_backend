import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chatgo-token"];
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

export { isAuthenticated, adminOnly };
