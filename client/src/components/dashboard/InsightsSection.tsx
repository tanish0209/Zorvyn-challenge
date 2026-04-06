import React from "react";

interface Insight {
  category: string;
  amount: number;
}

interface InsightsSectionProps {
  topIncome?: Insight[];
  topExpense?: Insight[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  topIncome = [],
  topExpense = [],
}) => {
  return (
    <div className="mt-20 grid grid-cols-1 gap-20 md:grid-cols-2">
      <div className="space-y-10">
        <h3 className="text-2xl font-semibold text-black uppercase tracking-tight">Income Distribution</h3>
        <div className="space-y-6">
          {topIncome.length > 0 ? (
            topIncome.map((i) => (
              <div key={i.category} className="space-y-2">
                <div className="flex justify-between text-sm font-semibold uppercase tracking-widest text-slate-400">
                  <span>{i.category}</span>
                  <span>${i.amount.toLocaleString()}</span>
                </div>
                <div className="h-1 w-full bg-black/5">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${Math.min(100, (i.amount / (topIncome[0].amount || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No data available.</p>
          )}
        </div>
      </div>

      <div className="space-y-10">
        <h3 className="text-2xl font-semibold text-black uppercase tracking-tight">Expense Distribution</h3>
        <div className="space-y-6">
          {topExpense.length > 0 ? (
            topExpense.map((i) => (
              <div key={i.category} className="space-y-2">
                <div className="flex justify-between text-sm font-semibold uppercase tracking-widest text-slate-400">
                  <span>{i.category}</span>
                  <span>${i.amount.toLocaleString()}</span>
                </div>
                <div className="h-1 w-full bg-black/5">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${Math.min(100, (i.amount / (topExpense[0].amount || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
