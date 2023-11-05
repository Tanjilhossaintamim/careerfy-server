import jwt from "jsonwebtoken";
import { Router } from "express";
const authRoute = Router();

authRoute.post("/", (req, res) => {
  const userData = {
    email: req.body?.user?.email,
  };
  const token = jwt.sign({ userData }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "2h",
  });
  res
    .cookie("token", token, { httpOnly: true, sameSite: "none", secure: true })
    .send({ success: true });
});

authRoute.post("/logout", (req, res) => {
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});
export default authRoute;
