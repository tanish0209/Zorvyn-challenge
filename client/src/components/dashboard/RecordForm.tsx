import React, { useState } from "react";

export interface RecordFormData {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  description: string;
}

interface RecordFormProps {
  onSubmit: (data: RecordFormData) => void;
  onCancel: () => void;
  initialData?: RecordFormData;
  submitting: boolean;
}

export const RecordForm: React.FC<RecordFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  submitting,
}) => {
  const [data, setData] = useState<RecordFormData>(
    initialData
      ? {
          amount: Number(initialData.amount),
          type: initialData.type,
          category: initialData.category,
          date: new Date(initialData.date).toISOString().split("T")[0],
          description: initialData.description || "",
        }
      : {
          amount: 0,
          type: "EXPENSE",
          category: "",
          date: new Date().toISOString().split("T")[0],
          description: "",
        }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.amount <= 0) return;
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 rounded-3xl bg-white p-12 shadow-2xl"
      >
        <h3 className="text-4xl font-semibold tracking-tight text-black">
          {initialData ? "Edit Record" : "New Record"}
        </h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setData({ ...data, type: "INCOME" })}
              className={`flex-1 rounded-2xl py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                data.type === "INCOME"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setData({ ...data, type: "EXPENSE" })}
              className={`flex-1 rounded-2xl py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                data.type === "EXPENSE"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              Expense
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Amount
            </label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              className="w-full border-b border-black/10 py-4 text-3xl font-semibold text-black outline-none transition-all focus:border-black"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Category
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Salary, Rent, Food"
              className="w-full border-b border-black/10 py-4 text-lg font-medium text-black outline-none transition-all focus:border-black"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Date</label>
            <input
              type="date"
              required
              className="w-full border-b border-black/10 py-4 text-lg font-medium text-black outline-none transition-all focus:border-black"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-2xl bg-black py-4 text-lg font-bold text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Record"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl bg-black/5 py-4 text-lg font-bold text-black transition-all hover:bg-black/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
