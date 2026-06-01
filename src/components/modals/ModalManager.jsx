// src/components/modals/ModalManager.jsx
import { useSelector } from "react-redux";
import {
  selectActiveModal,
  selectModalData,
} from "../../features/ui/uiSelectors";
import UserFormModal from "./UserFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ProductFormModal from "./ProductFormModal";
import OrderDetailModal from "./OrderDetailModal";

const ModalManager = () => {
  const activeModal = useSelector(selectActiveModal);
  const modalData = useSelector(selectModalData);

  if (!activeModal) return null;

  switch (activeModal) {
    case "createUser":
      return <UserFormModal user={null} />;
    case "editUser":
      return <UserFormModal user={modalData} />;
    case "deleteUser":
      return <DeleteConfirmModal user={modalData} />;
    case "createProduct":
      return <ProductFormModal product={null} />;
    case "editProduct":
      return <ProductFormModal product={modalData} />;
    case "deleteProduct":
      return <DeleteConfirmModal user={modalData} />;
    case "viewOrder":
      return <OrderDetailModal order={modalData} />;
    case "deleteOrder":
      return <DeleteConfirmModal user={modalData} />;
    default:
      return null;
  }
};

export default ModalManager;
