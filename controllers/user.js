import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

// Create a new user and save it to the database and save token in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "asdg",
    url: "asdlf",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created");
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    const error = new Error("Invalid username");
    error.statusCode = 400;
    return next(error);
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new Error("Invalid password"));

  sendToken(res, user, 200, "Welcome Back");
};

const getMyProfile = async (req, res) => {};

export { login, newUser, getMyProfile };
