import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PersonalInfoForm = ({
  data = {}, 
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
    },
    {
      key: "profession",
      label: "Profession Name",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile Link",
      icon: LinkedinIcon, 
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website Link",
      icon: Globe,
      type: "url",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Get started with the personal information
        </p>
      </div>

      <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
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
            <div className="flex flex-col items-center justify-center w-20 h-20 border border-dashed border-slate-300 rounded-full bg-white group-hover:border-green-500 group-hover:bg-green-50/30 transition-colors">
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

        {/* FIXED: typeof check hata diya taaki image string/URL hone par bhi toggler dikhe */}
        {data.image && (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const IconComponent = field.icon; 
          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <IconComponent className="size-4 text-gray-400" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white text-gray-800 placeholder:text-gray-400 shadow-sm"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;