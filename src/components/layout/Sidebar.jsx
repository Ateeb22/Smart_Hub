// src/components/layout/Sidebar.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { selectSidebarOpen } from "../../features/ui/uiSelectors";
import { selectUser, selectUserRole } from "../../features/auth/authSelectors";
import { logoutUser } from "../../features/auth/authThunks";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Zap,
  LogOut,
} from "lucide-react";

const allNavItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
    roles: ["admin", "manager", "user"],
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <Users size={18} />,
    roles: ["admin", "manager"],
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <Package size={18} />,
    roles: ["admin", "manager"],
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={18} />,
    roles: ["admin", "manager"],
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings size={18} />,
    roles: ["admin"],
  },
  {
    label: "Store Locator",
    path: "/store-locator",
    icon: <MapPin size={18} />,
    roles: ["admin", "manager", "user"],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectSidebarOpen);
  const user = useSelector(selectUser);
  const role = useSelector(selectUserRole);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Only show nav items the current role is allowed to see
  const visibleNavItems = allNavItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-0 overflow-hidden"} transition-all duration-300 bg-gray-900 text-white flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-700">
        <Zap size={22} className="text-blue-400" />
        <span className="text-xl font-bold tracking-wide">SmartHub</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {visibleNavItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Bottom — User Info + Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 px-4 mb-3">
          Signed in as{" "}
          <span className="text-white font-medium">
            {user?.name || "Admin"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
