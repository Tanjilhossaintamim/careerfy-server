import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: ["on-site", "hybrid", "remote", "part-time"],
  },
});

const Category = model("Category", categorySchema);
export default Category;
