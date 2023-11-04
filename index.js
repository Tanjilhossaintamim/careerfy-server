import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import jobRouter from "./src/routes/jobRoutes.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

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
app.use("/jobs", jobRouter);

app.listen(port, () => {
  console.log(`server running on port :${port}`);
});
