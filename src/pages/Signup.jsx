// src/pages/Signup.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/auth/authThunks";
import { clearError } from "../features/auth/authSlice";
import {
  selectAuthLoading,
  selectAuthError,
} from "../features/auth/authSelectors";
import { Zap, Loader } from "lucide-react";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(signupUser(data));
    if (result.success) navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Zap size={28} className="text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">SmartHub</span>
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          Create account
        </h1>
        <p className="text-sm text-gray-500 mb-6">Get started with SmartHub</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.password ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" /> Creating
                account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
