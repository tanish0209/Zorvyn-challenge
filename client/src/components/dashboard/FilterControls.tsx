"use client";

import React from "react";

interface FilterControlsProps {
  type: string;
  category: string;
  categories: string[];
  startDate: string;
  endDate: string;
  onTypeChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  type,
  category,
  categories,
  startDate,
  endDate,
  onTypeChange,
  onCategoryChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-8 rounded-3xl p-8">
      {/* Type Filter */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Type:</span>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="rounded-xl border-none bg-white px-6 py-3 text-sm font-semibold text-black outline-none shadow-sm focus:ring-1 focus:ring-black/10"
        >
          <option value="">All Types</option>
          <option value="INCOME">Inflow</option>
          <option value="EXPENSE">Outflow</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category:</span>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-xl border-none bg-white px-6 py-3 text-sm font-semibold text-black outline-none shadow-sm focus:ring-1 focus:ring-black/10 min-w-[150px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Range:</span>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="rounded-xl border-none bg-white px-4 py-3 text-sm font-semibold text-black outline-none shadow-sm focus:ring-1 focus:ring-black/10"
          />
          <span className="text-slate-300">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="rounded-xl border-none bg-white px-4 py-3 text-sm font-semibold text-black outline-none shadow-sm focus:ring-1 focus:ring-black/10"
          />
        </div>
      </div>

      {/* Clear Action */}
      {(type || category || startDate || endDate) && (
        <button
          onClick={() => {
            onTypeChange("");
            onCategoryChange("");
            onStartDateChange("");
            onEndDateChange("");
          }}
          className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline ml-auto"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterControls;
