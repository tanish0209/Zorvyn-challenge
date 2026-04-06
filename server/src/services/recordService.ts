import { RecordType } from "@prisma/client";
import prisma from "../prisma";
import { CreateFinancialRecordInput, UpdateFinancialRecordInput } from "../schemas/recordSchema";

export const getFinancialRecords = async (query: {
  type?: RecordType;
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const { type, category, startDate, endDate } = query;
  const filters: any = {};

  if (type) filters.type = type;
  if (category) filters.category = category;
  if (startDate || endDate) {
    filters.date = {
      ...(startDate && { gte: new Date(startDate) }),
      ...(endDate && { lte: new Date(endDate) }),
    };
  }

  return await prisma.financialRecord.findMany({
    where: filters,
    orderBy: { date: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
};

export const createFinancialRecord = async (data: CreateFinancialRecordInput) => {
  return await prisma.financialRecord.create({
    data: {
      ...data,
      date: data.date ? new Date(data.date) : new Date(),
    },
  });
};

export const updateFinancialRecordById = async (id: string, data: UpdateFinancialRecordInput) => {
  return await prisma.financialRecord.update({
    where: { id },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
  });
};

export const deleteFinancialRecordById = async (id: string) => {
  return await prisma.financialRecord.delete({ where: { id } });
};
