// import React, { useState, useEffect } from "react";
// import { Upload, X } from "lucide-react";
// import { getLabel } from "../../utils/getLabel";

// const File = ({
//   label,
//   name,
//   register,
//   setValue,
//   clearErrors,
//   error,
//   watch,
//   trigger,
//   reset,
//   exsitingFile
// }) => {
//   const [preview, setPreview] = useState(null);
//   const fileValue = watch(name);

//   // Cleanup preview URL on unmount
//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Set preview
//      setPreview(URL.createObjectURL(file));

//       // ✅ Update React Hook Form with validation
//      await setValue(name, file, { shouldDirty: true, shouldValidate: true });
//      await clearErrors(name);
//      await trigger(name);
//     }
//   };

//   const removeFile = async () => {
//     // ✅ Clear the file and revalidate
//     await setValue(name, null, { shouldDirty: true, shouldValidate: true });
//     setPreview(null);
//     await trigger(name);
//   };

//   const fileLabel = getLabel(label);

//   return (
//     <div className="w-full">
//       <label className="text-md text-secondary-400 font-semibold">
//         {fileLabel}
//       </label>

//       <div
//         className={`mt-1 flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl cursor-pointer transition p-4
//         ${
//           preview
//             ? "border-transparent items-start justify-start"
//             : "border-gray-300 hover:border-blue-400"
//         }`}
//         onClick={() => document.getElementById(name)?.click()}
//       >
//         {preview ? (
//           <div className="relative">
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-xl shadow"
//             />
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 removeFile();
//               }}
//               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center text-gray-500">
//             <Upload size={26} />
//             <p className="text-sm mt-2">Click to upload or drag & drop</p>
//             <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//           </div>
//         )}
//       </div>

//       <input
//         id={name}
//         type="file"
//         accept="image/*,application/pdf"
//         {...register(name, { required: "File is required" })}
//         onClick={(e) => (e.target.value = null)} // ✅ allow re-upload of same file
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//     </div>
//   );
// };

// export default File;


import React, { useState, useEffect } from 'react';
import { Upload, View, X, Trash2 } from 'lucide-react';
import { getLabel } from '../../utils/getLabel';
import tokenConfig from '../../api/tokenConfig';
import { addNotification } from '../../redux/slices/notificationSlice';
import { useDispatch } from 'react-redux';

const File = ({
  label,
  name,
  register,
  setValue,
  clearErrors,
  error,
  watch,
  trigger,
  exsitingFile, // Note: Typo in prop name (should be existingFile)
  carId,
  onFileUpdate, // Callback to trigger parent fetchCarData
}) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileValue = watch(name);

  // Close popup on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowPopup(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && !preview.startsWith('http')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Upload single file to backend
  const uploadSingleFile = async (file) => {
    if (!carId) {
      dispatch(addNotification({ message: 'Car ID unavailable', type: 'error' }));
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file); // Matches multer.single('file')

    try {
      const res = await tokenConfig.put(`/cars/${carId}/update-media/${name}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Use backend URL for preview (works for both images and PDFs)
      setPreview(res.data.file);
      await setValue(name, res.data.file, { shouldDirty: true, shouldValidate: true });
      await clearErrors(name);
      await trigger(name);
      onFileUpdate && onFileUpdate(); // Trigger parent refresh
      dispatch(addNotification({ message: `${getLabel(name)} updated successfully`, type: 'success' }));
    } catch (error) {
      console.error('❌ Single file upload error:', error);
      setPreview(null);
      await setValue(name, null, { shouldDirty: true, shouldValidate: true });
      dispatch(addNotification({
        message: `Error updating ${getLabel(name)}: ${error.response?.data?.error || error.message}`,
        type: 'error',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  // Remove file via backend DELETE route
  const removeFile = async () => {
    if (!carId) {
      dispatch(addNotification({ message: 'Car ID unavailable', type: 'error' }));
      return;
    }

    setIsUploading(true);
    try {
      await tokenConfig.delete(`/cars/${carId}/media/${name}`);
      setPreview(null);
      await setValue(name, null, { shouldDirty: true, shouldValidate: true });
      await trigger(name);
      onFileUpdate && onFileUpdate(); // Trigger parent refresh
      setShowPopup(false);
      dispatch(addNotification({ message: `${getLabel(name)} removed successfully`, type: 'success' }));
    } catch (error) {
      console.error('❌ File removal error:', error);
      dispatch(addNotification({
        message: `Error removing ${getLabel(name)}: ${error.response?.data?.error || error.message}`,
        type: 'error',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (exsitingFile) {
        // For existing files, upload immediately
        await uploadSingleFile(file);
      } else {
        // For new files, set local preview (uploaded in saveMediaDetails)
        setPreview(URL.createObjectURL(file));
        await setValue(name, file, { shouldDirty: true, shouldValidate: true });
        await clearErrors(name);
        await trigger(name);
      }
    }
  };

  const fileLabel = getLabel(label);
  const isPDF = exsitingFile?.endsWith('.pdf') || preview?.endsWith('.pdf');

  return (
    <div className="w-full">
      <label className="text-md text-secondary-400 font-semibold">{fileLabel}</label>

      {exsitingFile ? (
        <div
          className="flex justify-center items-center outline-2 outline-dashed outline-secondary-100 hover:outline-netural-200 cursor-pointer px-5 py-4 rounded-xl mt-2"
          onClick={() => setShowPopup(true)}
        >
          <div className="flex flex-col items-center text-gray-500">
            <View size={26} strokeWidth={1.2} />
            <p className="text-sm mt-2">Click to View / Edit</p>
          </div>
        </div>
      ) : (
        <div
          className={`mt-1 flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl cursor-pointer transition p-4
            ${preview ? 'border-transparent items-start justify-start' : 'border-gray-300 hover:border-blue-400'}`}
          onClick={() => document.getElementById(name)?.click()}
        >
          {preview ? (
            <div className="relative">
              {preview.endsWith('.pdf') ? (
                <embed src={preview} type="application/pdf" width="80" height="80" className="rounded-xl shadow" />
              ) : (
                <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-xl shadow" />
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  setValue(name, null, { shouldDirty: true, shouldValidate: true });
                  trigger(name);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <Upload size={26} />
              <p className="text-sm mt-2">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
            </div>
          )}
        </div>
      )}

      <input
        id={name}
        type="file"
        accept="image/*,application/pdf"
        {...register(name, { required: !exsitingFile && 'File is required' })}
        onClick={(e) => (e.target.value = null)}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      {isUploading && <p className="text-blue-500 text-xs mt-1">Processing...</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl flex flex-col justify-end items-end shadow-lg p-4 relative w-[90%] max-w-lg">
            <button
              onClick={() => setShowPopup(false)}
              className="text-secondary-300 hover:text-secondary-400 bg-secondary-100/30 hover:bg-secondary-100/60 p-3 rounded-full"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex justify-center mt-6">
                {isPDF ? (
                  <embed
                    src={exsitingFile}
                    type="application/pdf"
                    width="100%"
                    height="400px"
                    className="rounded-lg"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <img
                    src={exsitingFile}
                    alt="File preview"
                    className="max-h-[70vh] rounded-lg object-contain"
                    onError={(e) => (e.target.style.display = 'none')}
                    draggable={false}
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => document.getElementById(name)?.click()}
                  disabled={isUploading}
                  className="flex-1 bg-transparent outline-dashed outline-2 outline-secondary-300 hover:outline-transparent hover:bg-neutral-400 hover:text-white text-secondary-400 px-5 py-3 rounded-md text-sm disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Change File'}
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  disabled={!isUploading}
                  className="flex-1 bg-red-500/20 text-red-600 hover:bg-red-500 hover:text-white px-5 py-3 rounded-md text-sm disabled:opacity-50"
                >
                  {isUploading ? 'Removing...' : 'Remove File'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default File;