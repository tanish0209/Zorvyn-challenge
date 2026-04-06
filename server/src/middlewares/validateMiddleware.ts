import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        console.error("Validation failed:", fieldErrors);
        return res.status(400).json({
          error: "Validation error",
          details: fieldErrors,
        });
      }
      next(error);
    }
  };
};
