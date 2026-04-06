import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.createUser(req.body);
    const token = authService.generateAuthToken(user);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(error.message === "User already exists" ? 409 : 500).json({
      error: error.message || "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.authenticateUser(req.body);
    const token = authService.generateAuthToken(user);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Invalid credentials" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const updatedUser = await authService.updateUserProfile(req.params.userId as string, req.body);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(404).json({ error: "User not found or update failed" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to list users" });
  }
};
