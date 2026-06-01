// // src/pages/Login.jsx
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../features/auth/authThunks";
// import { clearError } from "../features/auth/authSlice";
// import {
//   selectAuthLoading,
//   selectAuthError,
//   selectIsAuthenticated,
// } from "../features/auth/authSelectors";
// import { Zap, Loader } from "lucide-react";
// import { useLocation } from "react-router-dom";

// const schema = yup.object({
//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .required("Password is required"),
// });

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const loading = useSelector(selectAuthLoading);
//   const error = useSelector(selectAuthError);
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   // If already logged in, redirect
//   useEffect(() => {
//     if (isAuthenticated) navigate("/admin/dashboard");
//   }, [isAuthenticated, navigate]);

//   // Clear error on unmount
//   useEffect(() => {
//     return () => dispatch(clearError());
//   }, [dispatch]);

//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/admin/dashboard";

//   const onSubmit = async (data) => {
//     const result = await dispatch(loginUser(data));
//     if (result.success) navigate(from, { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8">
//         {/* Logo */}
//         <div className="flex items-center justify-center gap-2 mb-8">
//           <Zap size={28} className="text-blue-600" />
//           <span className="text-2xl font-bold text-gray-800">SmartHub</span>
//         </div>

//         <h1 className="text-xl font-semibold text-gray-800 mb-1">
//           Welcome back
//         </h1>
//         <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

//         {/* Global Error */}
//         {error && (
//           <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4 border border-red-100">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               {...register("email")}
//               type="email"
//               placeholder="ali@smarthub.com"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
//                 ${
//                   errors.email
//                     ? "border-red-400 focus:border-red-400"
//                     : "border-gray-200 focus:border-blue-500"
//                 }`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               {...register("password")}
//               type="password"
//               placeholder="••••••••"
//               className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
//                 ${
//                   errors.password
//                     ? "border-red-400 focus:border-red-400"
//                     : "border-gray-200 focus:border-blue-500"
//                 }`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader size={16} className="animate-spin" /> Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         {/* Test credentials hint */}
//         <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 space-y-1">
//           <p className="font-medium text-gray-600">Test credentials:</p>
//           <p>Admin: ali@smarthub.com / admin123</p>
//           <p>Manager: sara@smarthub.com / manager123</p>
//         </div>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginUser } from "../features/auth/authThunks";
import { clearError } from "../features/auth/authSlice";
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";
import { Zap, Loader } from "lucide-react";
import {
  scaleIn,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "../utils/animations";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/admin/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (result.success) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-sm w-full max-w-md p-8"
      >
        {/* Logo */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Zap size={28} className="text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">SmartHub</span>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4 border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <motion.div variants={staggerItem}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="ali@smarthub.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={staggerItem}>
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
          </motion.div>

          <motion.div variants={staggerItem}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* Test credentials */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 space-y-1"
        >
          <p className="font-medium text-gray-600">Test credentials:</p>
          <p>Admin: ali@smarthub.com / admin123</p>
          <p>Manager: sara@smarthub.com / manager123</p>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
