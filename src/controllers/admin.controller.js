import jwt from "../utils/jwt.js";
import { read } from "../utils/model.js";

const POST = (req, res) => {
  try {
    let admins = read("admin");
    let { username, password } = req.body;

    let admin = admins.find(
      (admin) => admin.username == username && admin.password == password
    );

    if (!admin) throw new Error("Don't try to hack our server bruh");

    delete admin.password;

    return res.status(200).json({
      status: 200,
      message: "Welcome bro!",
      token: jwt.sign({ userId: admin.userId }),
      data: admin,
    });
  } catch (error) {
    return res.status(401).json({ status: 401, message: error.message });
  }
};

export default { POST };
