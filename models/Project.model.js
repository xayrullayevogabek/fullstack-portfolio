import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Project = model("Project", ProjectSchema);
export default Project;
