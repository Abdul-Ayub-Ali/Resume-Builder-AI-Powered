import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resume.controller.js";
import upload from "../config/multer.js";

const resumeRouter = express.Router();

//private routes
resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", upload.single("image"), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);

//public routes
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
