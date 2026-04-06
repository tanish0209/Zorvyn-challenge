import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import * as dashboardService from "../services/dashboardService";

export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
  try {
    const summary = await dashboardService.getDashboardSummary();
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Dashboard Service Error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
};

export const getCategoryStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await dashboardService.getCategoryStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Dashboard Service Error:", error);
    res.status(500).json({ error: "Failed to fetch category statistics" });
  }
};

export const getTrends = async (req: AuthRequest, res: Response) => {
  try {
    const recentActivity = await dashboardService.getRecentTrends();
    res.status(200).json({ recentActivity });
  } catch (error) {
    console.error("Dashboard Service Error:", error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};
