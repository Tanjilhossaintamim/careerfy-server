import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

import jobRouter from "./src/routes/jobRoutes.js";
import authRoute from "./src/routes/authRoute.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kkcmbk1.mongodb.net/JobWebSite?retryWrites=true`
  )
  .then(() => {
    console.log("mongodb connected successfully !");
  })
  .catch(() => {
    console.log("database connection failed !");
  });
///////////////
app.get("/", (req, res) => {
  res.send("server is running !");
});
// routers
app.use("/jwt", authRoute);
app.use("/jobs", jobRouter);

app.listen(port, () => {
  console.log(`server running on port :${port}`);
});
