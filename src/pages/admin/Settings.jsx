// src/pages/admin/Settings.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { selectUser } from "../../features/auth/authSelectors";
import { loginSuccess } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import PageWrapper from "../../components/ui/PageWrapper";
import { User, Lock, Bell, Shield, Loader } from "lucide-react";

// Schemas
const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().min(6).required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});

// Tab components
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full
      ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
  >
    {icon}
    {label}
  </button>
);

// Profile Tab
const ProfileTab = ({ user, dispatch }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 800));

    // Update Redux + localStorage
    const updatedUser = { ...user, ...data };
    dispatch(
      loginSuccess({
        user: updatedUser,
        token: localStorage.getItem("token"),
      }),
    );

    setLoading(false);
    toast.success("Profile updated successfully");
  };

  return (
    <PageWrapper>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Update your name and email address
          </p>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.name ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? (
                <>
                  <Loader size={14} className="animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

// Password Tab
const PasswordTab = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    reset();
    toast.success("Password updated successfully");
  };

  return (
    <PageWrapper>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Change Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Make sure your password is strong and secure
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                {...register("currentPassword")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.currentPassword ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                {...register("newPassword")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.newPassword ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.confirmPassword ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? (
                <>
                  <Loader size={14} className="animate-spin" /> Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

// Notifications Tab
const NotificationsTab = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newUsers: false,
    lowStock: true,
    systemAlerts: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference saved");
  };

  const items = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
      desc: "Receive notifications via email",
    },
    {
      key: "orderUpdates",
      label: "Order Updates",
      desc: "Get notified when order status changes",
    },
    {
      key: "newUsers",
      label: "New User Registrations",
      desc: "Alert when a new user signs up",
    },
    {
      key: "lowStock",
      label: "Low Stock Alerts",
      desc: "Notify when product stock is low",
    },
    {
      key: "systemAlerts",
      label: "System Alerts",
      desc: "Important system notifications",
    },
  ];

  return (
    <PageWrapper>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Notification Preferences
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Choose what notifications you want to receive
          </p>

          <div className="space-y-4 max-w-md">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    settings[item.key] ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      settings[item.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Security Tab
const SecurityTab = () => {
  const sessions = [
    {
      device: "Chrome on Windows",
      location: "Karachi, PK",
      current: true,
      time: "Active now",
    },
    {
      device: "Safari on iPhone",
      location: "Karachi, PK",
      current: false,
      time: "2 hours ago",
    },
  ];

  return (
    <PageWrapper>
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Security
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Manage your account security and active sessions
          </p>

          {/* Active Sessions */}
          <div className="max-w-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Active Sessions
            </h3>
            <div className="space-y-3">
              {sessions.map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {session.device}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {session.location} · {session.time}
                    </p>
                  </div>
                  {session.current ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Current
                    </span>
                  ) : (
                    <button
                      onClick={() => toast.success("Session revoked")}
                      className="text-xs text-red-500 hover:underline font-medium"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Two Factor Auth */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Add an extra layer of security
                  </p>
                </div>
                <button
                  onClick={() => toast.info("2FA setup coming soon")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Main Settings Component
const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "password", label: "Password", icon: <Lock size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} dispatch={dispatch} />;
      case "password":
        return <PasswordTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-5">
        <div className="space-y-5">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account and preferences
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Sidebar Tabs */}
            <div className="w-full sm:w-48 bg-white rounded-xl shadow-sm border border-gray-100 p-2 h-fit">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    icon={tab.icon}
                    label={tab.label}
                  />
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {renderTab()}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Settings;
