import { Router } from "express";
import Job from "../schema/jobSchema/jobSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const jobRouter = Router();

jobRouter.post("/", verifyToken, async (req, res) => {
  const data = req.body;
  data.userEmail = req.user;
  const newJob = new Job(data);
  try {
    const result = await newJob.save();

    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});
jobRouter.get("/", async (req, res) => {
  res.send("success");
});
export default jobRouter;
