import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./src/lib/db.js";

// Routers
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import groupRoutes from "./src/routes/group.route.js";
import sqlRoutes from "./src/routes/sql.route.js";
import postRoutes from "./src/routes/post.routes.js"; // New Facebook-style routes
import quizRoutes from "./src/routes/quiz.route.js";
import quoteRoutes from "./src/routes/quote.route.js"

import leaderboardRoutes from "./src/routes/leaderboard.route.js"

// Socket.IO app/server (already wires up group socket events)
import { app, server } from "./src/lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Core middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Mount all group endpoints like /api/groups, /api/group/:groupId/...
app.use("/api/group", groupRoutes);

// SQL quiz endpoints: /api/quiz/...
app.use("/api/quiz", sqlRoutes);

// Facebook-style social media endpoints: /api/posts/...
app.use("/api/post", postRoutes);



//////////////
//add the quotes route
app.use("/api/quotes", quoteRoutes);

////////// leaderboard///////

app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/quiz/flow", quizRoutes);
// Static files (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Express 5-compatible catch-all (avoid "*")
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});