import jwt from "jsonwebtoken";
import Config from "../config/config.js";

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    Config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;