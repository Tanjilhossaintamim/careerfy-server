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
  const query = {};

  const jobCategory = req.query?.category;
  const jobTitle = req.query?.title;
  if (jobCategory) {
    query.jobCategory = jobCategory;
  }
  if (jobTitle) {
    query.jobTitle = { $regex: jobTitle, $options: "i" };
  }
  const results = await Job.find(query);
  res.send(results);
});

jobRouter.get("/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const filter = {
    _id,
  };
  try {
    const result = await Job.findOne(filter);
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

jobRouter.put("/:id", verifyToken, async (req, res) => {
  const _id = req.params?.id;
  try {
    const filter = { _id };
    const updatedDoc = { $set: { ...req.body } };
    const result = await Job.updateOne(filter, updatedDoc);
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

jobRouter.delete("/:id", verifyToken, async (req, res) => {
  const _id = req.params?.id;
  try {
    const filter = { _id };

    const result = await Job.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default jobRouter;
