import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRouter from "./routes/ai.routes.js";

const cors = require('cors');


app.use(cors({
    origin: 'https://resume-builder-ai-powered-pi.vercel.app/', 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
}));
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("server is live...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use('/api/ai',aiRouter)
export default app;
