// // src/pages/admin/Dashboard.jsx
// import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
// import useFetch from "../../hooks/useFetch";
// import {
//   getStats,
//   getMonthlySales,
//   getCategoryStats,
// } from "../../api/dashboardService";
// import { getOrders } from "../../api/orderService";
// import StatsCard from "../../components/ui/StatsCard";
// import SalesLineChart from "../../components/charts/SalesLineChart";
// import CategoryPieChart from "../../components/charts/CategoryPieChart";
// import OrdersBarChart from "../../components/charts/OrdersBarChart";
// import RecentActivity from "../../components/ui/RecentActivity";
// import Spinner from "../../components/ui/Spinner";

// const statIcons = [
//   { icon: <Users size={20} className="text-blue-600" />, color: "bg-blue-50" },
//   {
//     icon: <Package size={20} className="text-green-600" />,
//     color: "bg-green-50",
//   },
//   {
//     icon: <ShoppingCart size={20} className="text-amber-600" />,
//     color: "bg-amber-50",
//   },
//   {
//     icon: <DollarSign size={20} className="text-purple-600" />,
//     color: "bg-purple-50",
//   },
// ];

// const Dashboard = () => {
//   const { data: stats, loading: statsLoading } = useFetch(getStats);
//   const { data: monthlySales, loading: salesLoading } =
//     useFetch(getMonthlySales);
//   const { data: categoryData, loading: categoryLoading } =
//     useFetch(getCategoryStats);
//   const { data: orders, loading: ordersLoading } = useFetch(getOrders);

//   const isLoading =
//     statsLoading || salesLoading || categoryLoading || ordersLoading;

//   if (isLoading) return <Spinner />;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Welcome back! Here's what's happening.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <StatsCard
//             key={stat.id}
//             title={stat.title}
//             value={stat.value}
//             change={stat.change}
//             trend={stat.trend}
//             icon={statIcons[index].icon}
//             color={statIcons[index].color}
//           />
//         ))}
//       </div>

//       {/* Line Chart — Full Width */}
//       <SalesLineChart data={monthlySales} />

//       {/* Bar Chart + Pie Chart — Side by Side */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <OrdersBarChart data={monthlySales} />
//         <CategoryPieChart data={categoryData} />
//       </div>

//       {/* Recent Orders */}
//       <RecentActivity orders={orders} />
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/admin/Dashboard.jsx
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import {
  getStats,
  getMonthlySales,
  getCategoryStats,
} from "../../api/dashboardService";
import { getOrders } from "../../api/orderService";
import StatsCard from "../../components/ui/StatsCard";
import SalesLineChart from "../../components/charts/SalesLineChart";
import CategoryPieChart from "../../components/charts/CategoryPieChart";
import OrdersBarChart from "../../components/charts/OrdersBarChart";
import RecentActivity from "../../components/ui/RecentActivity";
import Spinner from "../../components/ui/Spinner";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "../../utils/animations";

const statIcons = [
  { icon: <Users size={20} className="text-blue-600" />, color: "bg-blue-50" },
  {
    icon: <Package size={20} className="text-green-600" />,
    color: "bg-green-50",
  },
  {
    icon: <ShoppingCart size={20} className="text-amber-600" />,
    color: "bg-amber-50",
  },
  {
    icon: <DollarSign size={20} className="text-purple-600" />,
    color: "bg-purple-50",
  },
];

const Dashboard = () => {
  const { data: stats, loading: statsLoading } = useFetch(getStats);
  const { data: monthlySales, loading: salesLoading } =
    useFetch(getMonthlySales);
  const { data: categoryData, loading: categoryLoading } =
    useFetch(getCategoryStats);
  const { data: orders, loading: ordersLoading } = useFetch(getOrders);

  const isLoading =
    statsLoading || salesLoading || categoryLoading || ordersLoading;

  if (isLoading) return <Spinner />;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </motion.div>

      {/* Stats Cards — stagger animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.id} variants={staggerItem}>
            <StatsCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={statIcons[index].icon}
              color={statIcons[index].color}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Line Chart */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <SalesLineChart data={monthlySales} />
      </motion.div>

      {/* Bar + Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={slideInLeft} initial="hidden" animate="visible">
          <OrdersBarChart data={monthlySales} />
        </motion.div>
        <motion.div variants={slideInRight} initial="hidden" animate="visible">
          <CategoryPieChart data={categoryData} />
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <RecentActivity orders={orders} />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
