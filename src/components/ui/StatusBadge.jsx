// src/components/ui/StatusBadge.jsx
const statusStyles = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
      ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
