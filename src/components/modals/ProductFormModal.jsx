// src/components/modals/ProductFormModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { X, Loader } from "lucide-react";
import { addProduct, editProduct } from "../../features/products/productSlice";
import { selectProductsActionLoading } from "../../features/products/productSelectors";
import { closeModal } from "../../features/ui/uiSlice";
import { toast } from "react-toastify";
import ImageUpload from "../ui/ImageUpload";
import { motion } from "framer-motion";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .positive("Must be positive")
    .required("Price is required"),
  stock: yup
    .number()
    .min(0, "Cannot be negative")
    .required("Stock is required"),
  status: yup.string().oneOf(["active", "inactive"]).required(),
  image: yup.string().optional(),
});

const ProductFormModal = ({ product }) => {
  const dispatch = useDispatch();
  const actionLoading = useSelector(selectProductsActionLoading);
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEditing
      ? product
      : { status: "active", stock: 0, price: 0, image: "" },
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = async (data) => {
    if (isEditing) {
      await dispatch(editProduct({ id: product.id, productData: data }));
      toast.success("Product updated successfully");
    } else {
      await dispatch(addProduct(data));
      toast.success("Product created successfully");
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="text-base font-semibold text-gray-800">
            {isEditing ? "Edit Product" : "Add New Product"}
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
          {/* Image Upload */}
          <ImageUpload
            value={imageValue}
            onChange={(url) => setValue("image", url)}
          />

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Wireless Headphones"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.name ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              {...register("category")}
              type="text"
              placeholder="Electronics"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${errors.category ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                {...register("price")}
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                  ${errors.price ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                {...register("stock")}
                type="number"
                placeholder="0"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                  ${errors.stock ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
                "Update Product"
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductFormModal;
