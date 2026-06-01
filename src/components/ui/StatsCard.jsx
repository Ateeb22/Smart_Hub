// src/components/ui/StatsCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, change, trend, icon, color }) => {
  const isUp = trend === "up";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-2">
        {typeof value === "number" && title === "Revenue"
          ? `$${value.toLocaleString()}`
          : value.toLocaleString()}
      </p>
      <div className="flex items-center gap-1">
        {isUp ? (
          <TrendingUp size={14} className="text-green-500" />
        ) : (
          <TrendingDown size={14} className="text-red-500" />
        )}
        <span
          className={`text-xs font-medium ${isUp ? "text-green-500" : "text-red-500"}`}
        >
          {change}
        </span>
        <span className="text-xs text-gray-400 ml-1">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
