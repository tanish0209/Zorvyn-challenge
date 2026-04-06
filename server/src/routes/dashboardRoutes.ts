import express from "express";
import { getDashboardSummary, getCategoryStats, getTrends } from "../controllers/dashboardController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { Role } from "@prisma/client";

const router = express.Router();

router.use(authenticate);

// Viewer, Analyst, Admin can view basic dashboard
router.get("/summary", authorize([Role.VIEWER, Role.ANALYST, Role.ADMIN]), getDashboardSummary);

// Analysts and Admins can view insights (Category stats and trends)
router.get("/categories", authorize([Role.ANALYST, Role.ADMIN]), getCategoryStats);
router.get("/trends", authorize([Role.ANALYST, Role.ADMIN]), getTrends);

export default router;
