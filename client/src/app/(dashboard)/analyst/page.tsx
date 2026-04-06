"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import StatCard from "@/components/dashboard/StatCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import FilterControls from "@/components/dashboard/FilterControls";

export default function AnalystDashboard() {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const fetchRecords = useCallback(async (currentType: string, currentCategory: string, currentStart: string, currentEnd: string) => {
    if (!token || user?.role !== "ANALYST") return;
    
    setFetching(true);
    try {
      const params = new URLSearchParams();
      if (currentType) params.append("type", currentType);
      if (currentCategory) params.append("category", currentCategory);
      if (currentStart) params.append("startDate", currentStart);
      if (currentEnd) params.append("endDate", currentEnd);

      const [sum, rec] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/records?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!currentType && !currentCategory && !currentStart && !currentEnd) {
        setAllCategories(Array.from(new Set(rec.data.map((t: any) => t.category))) as string[]);
      }

      setData({ summary: sum.data.summary, transactions: rec.data });
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchRecords(type, category, startDate, endDate);
  }, [type, category, startDate, endDate, fetchRecords]);

  if (fetching && !data) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
    </div>
  );

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold tracking-tighter text-black">Financial Analysis Dashboard</h1>
        <p className="text-xl text-slate-500">Categorical summary and activity tracking.</p>
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

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <StatCard label="Live Balance" value={`$${data?.summary.netBalance.toLocaleString()}`} isPrimary />
        <StatCard label="Total Inflow" value={`$${data?.summary.totalIncome.toLocaleString()}`} />
        <StatCard label="Total Outflow" value={`$${data?.summary.totalExpenses.toLocaleString()}`} />
      </div>

      <div className="mt-24 space-y-10">
        <h3 className="text-2xl font-semibold text-black uppercase tracking-tight">System Transactions</h3>
        <TransactionTable transactions={data?.transactions || []} />
      </div>
    </div>
  );
}
