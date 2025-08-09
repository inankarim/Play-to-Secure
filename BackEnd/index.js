import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import quizRoutes from "./src/routes/sql.route.js";
import { connectDB } from "./src/lib/db.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// ✅ Middleware should be added BEFORE route handlers
app.use(express.json()); // <-- move this line up
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/quiz/",quizRoutes);
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});
