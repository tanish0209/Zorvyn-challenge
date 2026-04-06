import React from "react";

export interface Transaction {
  id: string;
  amount: string;
  type: string;
  category: string;
  date: string;
  description?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onAction?: (action: string, id: string) => void;
  showActions?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onAction,
  showActions,
}) => {
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-black">
            <th className="pb-4 text-sm font-semibold text-black">Date</th>
            <th className="pb-4 text-sm font-semibold text-black">Category</th>
            <th className="pb-4 text-sm font-semibold text-black">Type</th>
            <th className="pb-4 text-sm font-semibold text-black text-right">Amount</th>
            {showActions && <th className="pb-4 text-sm font-semibold text-black text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id} className="group transition-colors hover:bg-black/[0.02]">
                <td className="py-6 text-sm text-slate-600">{new Date(t.date).toLocaleDateString()}</td>
                <td className="py-6">
                  <span className="text-sm font-medium text-black uppercase tracking-wider">
                    {t.category}
                  </span>
                </td>
                <td className="py-6 text-sm font-medium text-black uppercase tracking-widest">
                  {t.type}
                </td>
                <td className="py-6 text-right font-semibold text-black">
                  ${Number(t.amount).toLocaleString()}
                </td>
                {showActions && (
                  <td className="py-6 text-right space-x-4">
                    <button
                      onClick={() => onAction?.("edit", t.id)}
                      className="text-xs font-bold text-black uppercase hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onAction?.("delete", t.id)}
                      className="text-xs font-bold text-red-500 uppercase hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showActions ? 5 : 4} className="py-20 text-center text-slate-400">
                No transactions recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
