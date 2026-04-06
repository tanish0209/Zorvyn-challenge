"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import InsightsSection from "@/components/dashboard/InsightsSection";
import TransactionTable from "@/components/dashboard/TransactionTable";
import FilterControls from "@/components/dashboard/FilterControls";

export default function AnalystInsights() {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const fetchAll = useCallback(async (currentType: string, currentCategory: string, currentStart: string, currentEnd: string) => {
    if (!token || (user?.role !== "ANALYST" && user?.role !== "ADMIN")) return;
    
    setFetching(true);
    try {
      const params = new URLSearchParams();
      if (currentType) params.append("type", currentType);
      if (currentCategory) params.append("category", currentCategory);
      if (currentStart) params.append("startDate", currentStart);
      if (currentEnd) params.append("endDate", currentEnd);

      const rec = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/records?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!currentType && !currentCategory && !currentStart && !currentEnd) {
        setAllCategories(Array.from(new Set(rec.data.map((t: any) => t.category))) as string[]);
      }

      // Derive insights from transactions
      const incomeDist = rec.data
        .filter((t: any) => t.type === "INCOME")
        .reduce((acc: any, cur: any) => {
          acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount);
          return acc;
        }, {});
      
      const expenseDist = rec.data
        .filter((t: any) => t.type === "EXPENSE")
        .reduce((acc: any, cur: any) => {
          acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount);
          return acc;
        }, {});

      const formatDist = (dist: any) => Object.entries(dist).map(([k, v]) => ({ category: k, amount: v as number })).sort((a,b) => b.amount - a.amount);

      setData({ 
        transactions: rec.data,
        topIncome: formatDist(incomeDist),
        topExpense: formatDist(expenseDist)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchAll(type, category, startDate, endDate);
  }, [type, category, startDate, endDate, fetchAll]);

  if (fetching && !data) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
    </div>
  );

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold tracking-tighter text-black">Analytic Insights</h1>
        <p className="text-xl text-slate-500">Categorical breakdown and detailed activity auditing.</p>
      </div>

      <FilterControls
        type={type}
        category={category}
        categories={allCategories}
        startDate={startDate}
        endDate={endDate}
        onTypeChange={setType}
        onCategoryChange={setCategory}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <InsightsSection topIncome={data?.topIncome} topExpense={data?.topExpense} />

      <div className="mt-24 space-y-10">
        <h3 className="text-2xl font-semibold text-black uppercase tracking-tight">System Transactions</h3>
        <TransactionTable transactions={data?.transactions || []} />
      </div>
    </div>
  );
}
