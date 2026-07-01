import { User } from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data = {}, // Default empty object taaki undefined error na aaye
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    // FIXED: onchange ki jagah capital 'C' ke saath onChange kiya
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Get started with the personal information
      </p>
      
      <div className="flex items-center gap-4">
        <label className="cursor-pointer group block">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-20 h-20 border border-dashed border-slate-300 rounded-full bg-slate-50 group-hover:border-green-500 group-hover:bg-green-50/30 transition-colors">
              <User className="size-6 text-slate-400 group-hover:text-green-600 transition-colors" />
              <span className="text-[10px] text-slate-500 font-medium text-center px-1 mt-1">
                Upload
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleChange("image", e.target.files[0]);
              }
            }}
          />
        </label>

        {/* Background remove toggler condition check */}
        {data.image && typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-2 text-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Remove Background
            </p>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4 shadow-sm"></span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;