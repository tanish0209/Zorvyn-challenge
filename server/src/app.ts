import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

// Route imports
import authRoutes from "./routes/authRoutes";
import recordRoutes from "./routes/recordRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandle Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

export default app;
