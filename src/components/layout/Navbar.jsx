// src/components/layout/Navbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/ui/uiSlice";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "../../features/notifications/notificationSlice";
import {
  selectUnreadCount,
  selectNotifications,
} from "../../features/notifications/notificationSelectors";
import { selectUser } from "../../features/auth/authSelectors";
import { useEffect, useState } from "react";
import { Menu, Bell, User } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(selectUnreadCount);
  const notifications = useSelector(selectNotifications);
  const user = useSelector(selectUser);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative">
      {/* Hamburger */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="text-gray-500 hover:text-gray-800 transition-colors"
      >
        <Menu size={22} />
      </button>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative text-gray-500 hover:text-gray-800"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">
                  Notifications
                </span>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-4 py-3 text-sm ${n.read ? "text-gray-400" : "text-gray-700 font-medium bg-blue-50"}`}
                  >
                    {n.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="font-medium hidden sm:block">
            {user?.name || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
