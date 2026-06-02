import jwt from "jsonwebtoken";
import handleError from "../helpper/handleError.js";
import user from "../model/user.js";

export default async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new handleError("Please login to access", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();
  } catch (error) {
    return next(new handleError("Please login to access", 401));
  }
};
