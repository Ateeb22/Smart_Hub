// src/components/ui/RecentActivity.jsx
const statusStyles = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const RecentActivity = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Recent Orders
      </h2>
      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {order.userName}
              </p>
              <p className="text-xs text-gray-400">{order.product}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                ${order.amount ? Number(order.amount).toFixed(2) : "0.00"}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
