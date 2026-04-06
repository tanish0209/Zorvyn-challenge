import express from "express";
import { register, login, updateRole, listUsers } from "../controllers/authController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateMiddleware";
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from "../schemas/userSchema";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/register", validateRequest(userRegisterSchema), register);
router.post("/login", validateRequest(userLoginSchema), login);

// Admin only routes
router.get(
  "/users",
  authenticate,
  authorize([Role.ADMIN]),
  listUsers
);

router.patch(
  "/users/:userId",
  authenticate,
  authorize([Role.ADMIN]),
  validateRequest(userUpdateSchema),
  updateRole
);

export default router;
