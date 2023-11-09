import jwt from "jsonwebtoken";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
const authRoute = Router();

authRoute.post("/", (req, res) => {
  const userData = {
    email: req.body?.email,
  };

  const token = jwt.sign({ userData }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

authRoute.post("/logout", (req, res) => {
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});
authRoute.post("/checklogin", verifyToken, (req, res) => {
  res.send({ loggedIn: true });
});
export default authRoute;
