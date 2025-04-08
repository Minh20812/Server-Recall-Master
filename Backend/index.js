import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import quesstionRoutes from "./src/routes/questionRoutes.js";
import topicRoutes from "./src/routes/topicRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

connectDB();
const app = express();

app.use(
  cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://recallmaster.vercel.app", "http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", quesstionRoutes);
app.use("/api/topics", topicRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: err.message || "Internal Server Error",
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// app.listen(port, () => console.log(`Server running on port ${port}`));

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
