// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <ShieldX size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 text-sm mb-6">
          You don't have permission to view this page.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
