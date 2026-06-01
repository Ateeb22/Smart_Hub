// src/components/modals/UserFormModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { X, Loader } from "lucide-react";
import { addUser, editUser } from "../../features/users/userSlice";
import { selectUsersActionLoading } from "../../features/users/userSelectors";
import { closeModal } from "../../features/ui/uiSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup
    .string()
    .oneOf(["admin", "manager", "user"])
    .required("Role is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});

const UserFormModal = ({ user }) => {
  const dispatch = useDispatch();
  const actionLoading = useSelector(selectUsersActionLoading);
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEditing ? user : { role: "user", status: "active" },
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const onSubmit = async (data) => {
    if (isEditing) {
      await dispatch(editUser({ id: user.id, userData: data }));
      toast.success("User updated successfully");
    } else {
      await dispatch(addUser(data));
      toast.success("User created successfully");
    }
    dispatch(closeModal());
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
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Ali Hassan"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.name ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="ali@example.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              {...register("role")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-white
                ${errors.role ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-white
                ${errors.status ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <>
                  <Loader size={14} className="animate-spin" /> Saving...
                </>
              ) : isEditing ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserFormModal;
