import { Schema, model } from "mongoose";

const ResumeSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  title: { type: String, required: true },
  university: { type: String, required: true },
  description: { type: String, required: true },
});

const Resume = model("Resume", ResumeSchema);

export default Resume;
