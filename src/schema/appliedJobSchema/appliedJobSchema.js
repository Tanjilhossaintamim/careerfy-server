import { Schema, model } from "mongoose";

const appliedSchema = new Schema({
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
});

const AppliedJob = model("AppliedJob", appliedSchema);
export default AppliedJob;
