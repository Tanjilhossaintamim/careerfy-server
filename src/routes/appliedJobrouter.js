import { Router } from "express";
import AppliedJob from "../schema/appliedJobSchema/appliedJobSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import Job from "../schema/jobSchema/jobSchema.js";

const appliedJobRouter = Router();

appliedJobRouter.post("/", verifyToken, async (req, res) => {
  const email = req.user;
  const data = req.body;
  data.applicantEmail = email;

  try {
    const isMyJob = await Job.findOne({
      _id: req.body.job,
      userEmail: email,
    });
    if (isMyJob?._id) {
      return res
        .status(403)
        .send({ message: "can not apply for your own job" });
    }
    const isAllreadyApplied = await AppliedJob.findOne({
      applicantEmail: email,
      job: req.body.job,
    });

    if (isAllreadyApplied?._id) {
      return res
        .status(403)
        .send({ message: "you already applied for this job!" });
    }
    const savedData = new AppliedJob(data);
    const result = await savedData.save();
    res.send(result);
    /// update this current job applicants number
    await Job.updateOne(
      { _id: req.body.job },
      { $inc: { jobApplicantsNumber: 1 } }
    );
  } catch (error) {
    res.send({ message: error?.message });
  }
});

appliedJobRouter.get("/", verifyToken, async (req, res) => {
  const email = req?.user;
  const query = {
    applicantEmail: email,
  };
  const matchField = {};
  if (req.query?.category) {
    matchField.jobCategory = req.query.category;
  }

  try {
    const results = await AppliedJob.find(query).populate({
      path: "job",
      select: "photoUrl jobTitle jobCategory salaryRangeTo salaryRangeFrom",
      match: matchField,
    });
    const finelResults = results?.filter((result) => result.job);
    res.send(finelResults);
  } catch (error) {
    res.send({ message: error?.message });
  }
});

export default appliedJobRouter;
