import JWT from "jsonwebtoken";

export default {
  sign: (payload) =>
    JWT.sign(payload, "" + process.env.SECRET_KEY, { expiresIn: 60000 * 60 }),
  verify: (token) => JWT.verify(token, "" + process.env.SECRET_KEY),
};
