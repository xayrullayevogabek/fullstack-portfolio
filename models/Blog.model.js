import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
});

const Blog = model("Blog", BlogSchema);

export default Blog;
