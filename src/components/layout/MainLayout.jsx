import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ModalManager from "../modals/ModalManager";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <ModalManager />
      </div>
    </div>
  );
};

export default MainLayout;
