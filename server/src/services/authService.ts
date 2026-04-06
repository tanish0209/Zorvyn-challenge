import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role, User } from "@prisma/client";
import prisma from "../prisma";
import { UserRegisterInput, UserLoginInput, UserUpdateInput } from "../schemas/userSchema";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const createUser = async (data: UserRegisterInput) => {
  const { password, ...userData } = data;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      role: (userData.role as Role) || Role.VIEWER,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const authenticateUser = async (data: UserLoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !user.isActive) {
    throw new Error("Invalid credentials or inactive user");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const generateAuthToken = (user: Partial<User>) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const updateUserProfile = async (userId: string, data: UserUpdateInput) => {
  const { password, ...updateData } = data;

  let finalUpdateData: any = { ...updateData };
  if (password) {
    finalUpdateData.password = await bcrypt.hash(password, 12);
  }

  return await prisma.user.update({
    where: { id: userId },
    data: finalUpdateData,
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};
