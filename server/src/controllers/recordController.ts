import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import * as recordService from "../services/recordService";

export const getRecords = async (req: AuthRequest, res: Response) => {
  try {
    const records = await recordService.getFinancialRecords(req.query as any);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

export const createRecord = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("Unauthorized");

    const record = await recordService.createFinancialRecord({
      ...req.body,
      userId,
    });
    res.status(201).json(record);
  } catch (error: any) {
    res.status(error.message === "Unauthorized" ? 401 : 500).json({
      error: error.message || "Failed to create record",
    });
  }
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  try {
    const updatedRecord = await recordService.updateFinancialRecordById(req.params.id as string, req.body);
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(404).json({ error: "Record not found or update failed" });
  }
};

export const deleteRecord = async (req: AuthRequest, res: Response) => {
  try {
    await recordService.deleteFinancialRecordById(req.params.id as string);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Record not found" });
  }
};
