import jwt from "../utils/jwt.js";

export default (req, res, next) => {
  try {
    let { token } = req.headers;
    if (token) {
      let { error } = jwt.verify(token);
      if (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("Token required");
    }

    return next();
  } catch (error) {
    res.status(403).json({ status: 403, message: error.message });
  }
};
