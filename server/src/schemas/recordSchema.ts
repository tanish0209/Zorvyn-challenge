import { z } from "zod";

export const RecordType = z.enum(["INCOME", "EXPENSE"]);

export const financialRecordSchema = z.object({
  amount: z.coerce.number().positive("Amount must be a positive number"),
  type: RecordType,
  category: z.string().min(1, "Category is required"),
  date: z.coerce.date().optional(),
  description: z.string().max(255).nullish(),
  notes: z.string().nullish(),
  userId: z.string().uuid("Invalid user ID format"),
});

export const createFinancialRecordSchema = financialRecordSchema.omit({ userId: true });
export const updateFinancialRecordSchema = financialRecordSchema.partial().omit({ userId: true });

export type CreateFinancialRecordInput = z.infer<typeof financialRecordSchema>;
export type UpdateFinancialRecordInput = z.infer<typeof updateFinancialRecordSchema>;
