// // // src/pages/admin/Users.jsx
// // import useFetch from "../../hooks/useFetch";
// // import { getUsers } from "../../api/userService";
// // import Spinner from "../../components/ui/Spinner";

// // const Users = () => {
// //   const { data: users, loading, error } = useFetch(getUsers);

// //   if (loading) return <Spinner />;
// //   if (error) return <p className="text-red-500">Error: {error}</p>;
// //   if (!users.length)
// //     return <p className="text-gray-500 p-6">No users found.</p>;

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>
// //       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// //         <table className="w-full text-sm text-left">
// //           <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
// //             <tr>
// //               <th className="px-6 py-4">Name</th>
// //               <th className="px-6 py-4">Email</th>
// //               <th className="px-6 py-4">Role</th>
// //               <th className="px-6 py-4">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {users.map((user) => (
// //               <tr key={user.id} className="hover:bg-gray-50 transition-colors">
// //                 <td className="px-6 py-4 font-medium text-gray-800">
// //                   {user.name}
// //                 </td>
// //                 <td className="px-6 py-4 text-gray-500">{user.email}</td>
// //                 <td className="px-6 py-4 capitalize text-gray-600">
// //                   {user.role}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   <span
// //                     className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                       user.status === "active"
// //                         ? "bg-green-100 text-green-700"
// //                         : "bg-red-100 text-red-700"
// //                     }`}
// //                   >
// //                     {user.status}
// //                   </span>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Users;

// // src/pages/admin/Users.jsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
// import { fetchUsers } from "../../features/users/userSlice";
// import {
//   selectUsers,
//   selectUsersLoading,
//   selectUsersError,
// } from "../../features/users/userSelectors";
// import { openModal } from "../../features/ui/uiSlice";
// import Spinner from "../../components/ui/Spinner";

// const Users = () => {
//   const dispatch = useDispatch();
//   const users = useSelector(selectUsers);
//   const loading = useSelector(selectUsersLoading);
//   const error = useSelector(selectUsersError);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const filtered = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase()),
//   );

//   if (loading) return <Spinner />;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Users</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             {users.length} total users
//           </p>
//         </div>
//         <button
//           onClick={() => dispatch(openModal({ modal: "createUser" }))}
//           className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
//         >
//           <UserPlus size={16} />
//           Add User
//         </button>
//       </div>

//       {/* Search */}
//       <div className="relative w-full sm:w-72">
//         <Search
//           size={16}
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//         />
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-4">User</th>
//               <th className="px-6 py-4">Role</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Joined</th>
//               <th className="px-6 py-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="px-6 py-10 text-center text-gray-400 text-sm"
//                 >
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   {/* User Info */}
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="w-8 h-8 rounded-full bg-gray-200"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-800">{user.name}</p>
//                         <p className="text-xs text-gray-400">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Role */}
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium capitalize
//                       ${
//                         user.role === "admin"
//                           ? "bg-purple-100 text-purple-700"
//                           : user.role === "manager"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>

//                   {/* Status */}
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium
//                       ${
//                         user.status === "active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>

//                   {/* Joined */}
//                   <td className="px-6 py-4 text-gray-500">{user.createdAt}</td>

//                   {/* Actions */}
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button
//                         onClick={() =>
//                           dispatch(openModal({ modal: "editUser", data: user }))
//                         }
//                         className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
//                       >
//                         <Pencil size={15} />
//                       </button>
//                       <button
//                         onClick={() =>
//                           dispatch(
//                             openModal({ modal: "deleteUser", data: user }),
//                           )
//                         }
//                         className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;

// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
import { fetchUsers } from "../../features/users/userSlice";
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "../../features/users/userSelectors";
import { openModal } from "../../features/ui/uiSlice";
import Spinner from "../../components/ui/Spinner";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = users.filter(
    (u) =>
      (u.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (u.email?.toLowerCase() || "").includes(search.toLowerCase()),
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            {users.length} total users
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch(openModal({ modal: "createUser" }))}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <UserPlus size={16} />
          Add User
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-100"
          >
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-400 text-sm"
                >
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={staggerItem}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full bg-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "manager"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(openModal({ modal: "editUser", data: user }))
                        }
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            openModal({ modal: "deleteUser", data: user }),
                          )
                        }
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Users;
