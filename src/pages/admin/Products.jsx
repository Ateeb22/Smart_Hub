// src/pages/admin/Products.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PackagePlus, Pencil, Trash2, Search } from "lucide-react";
import { fetchProducts } from "../../features/products/productSlice";
import PageWrapper from "../../components/ui/PageWrapper";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productSelectors";
import { openModal } from "../../features/ui/uiSlice";
import Spinner from "../../components/ui/Spinner";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <PageWrapper>
      <div className="space-y-5">
        {/* existing content unchanged */}

        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                {products.length} total products
              </p>
            </div>
            <button
              onClick={() => dispatch(openModal({ modal: "createProduct" }))}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <PackagePlus size={16} />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
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
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-400 text-sm"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.image ||
                              "https://placehold.co/40x40?text=P"
                            }
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                          />
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-gray-500">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-medium text-gray-800">
                        ${Number(product.price).toFixed(2)}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`font-medium ${product.stock === 0 ? "text-red-500" : "text-gray-700"}`}
                        >
                          {product.stock === 0 ? "Out of stock" : product.stock}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modal: "editProduct",
                                  data: product,
                                }),
                              )
                            }
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({
                                  modal: "deleteProduct",
                                  data: product,
                                }),
                              )
                            }
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
