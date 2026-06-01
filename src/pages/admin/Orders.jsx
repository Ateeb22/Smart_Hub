// src/pages/admin/Orders.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash2, Search } from "lucide-react";
import { fetchOrders } from "../../features/orders/orderSlice";
import PageWrapper from "../../components/ui/PageWrapper";
import {
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from "../../features/orders/orderSelectors";
import { openModal } from "../../features/ui/uiSlice";
import Spinner from "../../components/ui/Spinner";
import StatusBadge from "../../components/ui/StatusBadge";

const FILTERS = ["all", "pending", "processing", "delivered", "cancelled"];

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      (o.userName?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (o.product?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <PageWrapper>
      <div className="space-y-5">
        {/* existing content unchanged */}

        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
              <p className="text-sm text-gray-500 mt-1">
                {orders.length} total orders
              </p>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors
                ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-gray-400 text-sm"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        #{order.id}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {order.userName || "—"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {order.product || "—"}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        $
                        {order.amount
                          ? Number(order.amount).toFixed(2)
                          : "0.00"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {order.createdAt || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({ modal: "viewOrder", data: order }),
                              )
                            }
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modal: "deleteOrder",
                                  data: order,
                                }),
                              )
                            }
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Orders;
