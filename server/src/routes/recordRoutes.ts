import express from "express";
import { getRecords, createRecord, updateRecord, deleteRecord } from "../controllers/recordController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { Role } from "@prisma/client";
import { validateRequest } from "../middlewares/validateMiddleware";
import { createFinancialRecordSchema, updateFinancialRecordSchema } from "../schemas/recordSchema";

const router = express.Router();

router.use(authenticate);

// All roles can read (getRecords)
router.get("/", authorize([Role.VIEWER, Role.ANALYST, Role.ADMIN]), getRecords);

// Admin only routes
router.post("/", authorize([Role.ADMIN]), validateRequest(createFinancialRecordSchema), createRecord);
router.patch("/:id", authorize([Role.ADMIN]), validateRequest(updateFinancialRecordSchema), updateRecord);
router.delete("/:id", authorize([Role.ADMIN]), deleteRecord);

export default router;
