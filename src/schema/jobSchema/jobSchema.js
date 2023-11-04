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
  userId: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
    enum: ["on-site", "hybrid", "remote", "part-time"],
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
// jobSchema.pre("save", (next) => {
//   if (!this.jobPostingDate) {
//     this.jobPostingDate = new Date();
//   }
//   if (!this.jobApplicantsNumber) {
//     this.jobApplicantsNumber = 0;
//   }
//   next();
// });

const Job = model("Job", jobSchema);
export default Job;
