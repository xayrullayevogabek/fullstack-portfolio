import { Router } from "express";
import Resume from "../models/Resume.model.js";
import Skills from "../models/Skills.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const [resumes, skills] = await Promise.all([Resume.find().lean(), Skills.find().lean()]);
  res.render("index", {
    resumes,
    skills,
  });
});

export default router;
