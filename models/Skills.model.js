import { Schema, model } from "mongoose";

const SkillsSchema = new Schema({
  percent: { type: Number, required: true },
  title: { type: String, required: true },
});

const Skills = model("Skills", SkillsSchema);
export default Skills;
