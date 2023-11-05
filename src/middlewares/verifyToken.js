import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access !" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "unauthorize access !" });
    }

    req.user = decode?.userData?.email;
    next();
  });
};
