import mongoose from "mongoose";
import { Schema } from "mongoose";

const BlogSchema = Schema(
  {
    uName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("blogs", BlogSchema);
