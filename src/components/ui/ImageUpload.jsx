// src/components/ui/ImageUpload.jsx
import { useState, useRef } from "react";
import { Upload, X, Loader } from "lucide-react";
import uploadImage from "../../utils/uploadImage";

const ImageUpload = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      console.error("Upload failed:", err);
      setPreview(null);
      onChange("");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Image
      </label>

      {preview ? (
        <div className="relative w-32 h-32">
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 rounded-lg object-cover border border-gray-200"
          />
          {uploading && (
            <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center">
              <Loader size={20} className="animate-spin text-blue-600" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Upload size={20} className="text-gray-400" />
          <span className="text-xs text-gray-400">Upload</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
