import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: Role };
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error("JWT Verification failed:", error.message);
    return res.status(401).json({ error: `Unauthorized: ${error.message}` });
  }
};

export const authorize = (roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    if (!roles.includes(req.user.role)) {
      console.warn(`Access denied for role ${req.user.role}. Required: ${roles.join(", ")}`);
      return res.status(403).json({ error: "Forbidden: Access denied for this role" });
    }

    next();
  };
};
