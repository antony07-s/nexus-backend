import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

// Fail fast if required env vars are missing, instead of limping along
const requiredEnv = ["MONGODB_URI"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  console.error("Copy .env.example to .env and fill in real values before starting the server.");
  process.exit(1);
}

connectDB();

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.disable("x-powered-by");
app.use(express.json({ limit: "50kb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : false,
  })
);
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.send("Nexus Design & Built API is running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
