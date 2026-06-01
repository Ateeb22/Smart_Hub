// src/components/modals/OrderDetailModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { X, Loader } from "lucide-react";
import { updateOrderStatus } from "../../features/orders/orderSlice";
import { selectOrdersActionLoading } from "../../features/orders/orderSelectors";
import { closeModal } from "../../features/ui/uiSlice";
import { toast } from "react-toastify";
import StatusBadge from "../ui/StatusBadge";
import { motion } from "framer-motion";

const STATUS_OPTIONS = ["pending", "processing", "delivered", "cancelled"];

const OrderDetailModal = ({ order }) => {
  const dispatch = useDispatch();
  const actionLoading = useSelector(selectOrdersActionLoading);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await dispatch(updateOrderStatus({ id: order.id, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* rest of modal content unchanged */}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            Order #{order.id} Details
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Order Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium text-gray-800">
                {order.userName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product</span>
              <span className="font-medium text-gray-800">{order.product}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium text-gray-800">
                ${Number(order.amount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">
                {order.createdAt}
              </span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Current Status</span>
              <StatusBadge status={order.status} />
            </div>
          </div>

          {/* Update Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Status
            </label>
            <div className="relative">
              <select
                defaultValue={order.status}
                onChange={handleStatusChange}
                disabled={actionLoading}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 bg-white transition-colors"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status} className="capitalize">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              {actionLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader size={14} className="animate-spin text-blue-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => dispatch(closeModal())}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailModal;
