import { Router } from "express";
import Job from "../schema/jobSchema/jobSchema.js";

const jobRouter = Router();

jobRouter.post("/", async (req, res) => {
  const data = req.body;
  const newJob = new Job(data);
  try {
    const result = await newJob.save();

    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default jobRouter;
