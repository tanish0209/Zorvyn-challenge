import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  isPrimary?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, isPrimary }) => {
  return (
    <div className={`border-t ${isPrimary ? "border-black" : "border-black/10"} pt-6`}>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-4 text-5xl font-semibold text-black">{value}</p>
    </div>
  );
};

export default StatCard;
