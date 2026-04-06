import prisma from "../prisma";

export const getDashboardSummary = async () => {
  const aggregate = await prisma.financialRecord.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
  });

  const income = (aggregate as any[]).find((item) => item.type === "INCOME")?._sum.amount || 0;
  const expense = (aggregate as any[]).find((item) => item.type === "EXPENSE")?._sum.amount || 0;
  const netBalance = Number(income) - Number(expense);

  return {
    totalIncome: Number(income),
    totalExpenses: Number(expense),
    netBalance,
  };
};

export const getCategoryStats = async () => {
  const stats = await prisma.financialRecord.groupBy({
    by: ["category", "type"],
    _sum: {
      amount: true,
    },
  });

  return (stats as any[]).map((item) => ({
    category: item.category,
    type: item.type,
    total: Number(item._sum.amount),
  }));
};

export const getRecentTrends = async () => {
  return await prisma.financialRecord.findMany({
    orderBy: { date: "desc" },
    take: 5,
    include: {
      user: { select: { name: true } },
    },
  });
};
