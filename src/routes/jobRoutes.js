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
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 10;
  const skip = (page - 1) * limit;
  const matched = {};
  if (jobCategory) {
    matched.title = jobCategory;
  }
  if (jobTitle) {
    query.jobTitle = { $regex: jobTitle, $options: "i" };
  }
  const results = await Job.find(query)
    .populate({ path: "jobCategory", match: matched })
    .skip(skip)
    .limit(limit);
  const finalResults = results?.filter((result) => result.jobCategory);
  res.send(finalResults);
});

jobRouter.get("/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const filter = {
    _id,
  };
  try {
    const result = await Job.findOne(filter).populate({ path: "jobCategory" });
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

jobRouter.get("/myjobs/me", verifyToken, async (req, res) => {
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 10;
  const skip = (page - 1) * limit;
  const category = req.query?.category;
  const query = {
    userEmail: req.user,
  };
  const matchQuery = {};
  if (category) {
    matchQuery.title = category;
  }
  try {
    const results = await Job.find(query)
      .populate({ path: "jobCategory", match: matchQuery })
      .skip(skip)
      .limit(limit);
    const finalResults = results?.filter((result) => result.jobCategory);
    console.log(finalResults);
    res.send(finalResults);
    // res.send(results);
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
    const filter = { _id, userEmail: req.user };

    const result = await Job.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default jobRouter;
