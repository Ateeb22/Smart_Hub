// src/components/modals/DeleteConfirmModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { Trash2, X, Loader } from "lucide-react";
import { removeUser } from "../../features/users/userSlice";
import { selectUsersActionLoading } from "../../features/users/userSelectors";
import { closeModal } from "../../features/ui/uiSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const DeleteConfirmModal = ({ user }) => {
  const dispatch = useDispatch();
  const actionLoading = useSelector(selectUsersActionLoading);

  const handleDelete = async () => {
    await dispatch(removeUser(user.id));
    toast.success("User deleted successfully");
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
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Delete User
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">{user?.name}</span>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch(closeModal())}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={actionLoading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {actionLoading ? (
              <>
                <Loader size={14} className="animate-spin" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
