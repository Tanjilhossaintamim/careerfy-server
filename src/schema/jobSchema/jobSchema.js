import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  photoUrl: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    lowercase: true,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  salaryRangeTo: {
    type: Number,
    required: true,
    min: 4,
  },
  salaryRangeFrom: {
    type: Number,
    required: true,
    min: 4,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobPostingDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  jobApplicantsNumber: {
    type: Number,
    default: 0,
  },
});


const Job = model("Job", jobSchema);
export default Job;
