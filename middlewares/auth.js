import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

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

export { isAuthenticated };
