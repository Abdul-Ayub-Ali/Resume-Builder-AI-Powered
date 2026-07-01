import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "", 
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your education details</p>
        </div>

        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Plus className="size-4 text-green-600" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Content Section */}
      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">
            No education added yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Click "Add Education" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm space-y-4 hover:border-gray-300 transition-colors"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <h4 className="text-sm font-semibold text-gray-700">
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove Education"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Institution Name */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-gray-600">
                    Institution Name
                  </label>
                  <input
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. IIT Bombay or Delhi University"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Degree */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Degree
                  </label>
                  <input
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. B.Tech or B.Com"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Field of Study */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Field of Study
                  </label>
                  <input
                    value={education.field || ""}
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Computer Science"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Graduation Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Graduation Date
                  </label>
                  <input
                    value={education.graduation_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                    type="month"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                  />
                </div>

                {/* GPA / Percentage */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    GPA / Grade
                  </label>
                  <input
                    value={education.gpa || ""}
                    onChange={(e) =>
                      updateEducation(index, "gpa", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. 8.5/10 or 85%"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;