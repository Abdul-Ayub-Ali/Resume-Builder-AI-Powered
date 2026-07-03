import {
  Briefcase,
  Loader2,
  Plus, 
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {

  const {token} = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperince = () => {
    const newExperience = {
      company: "",
      poaition: "", 
      start_date: "",
      end_date: "",
      description: "",
      is_current: "",
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`

    try {
      const {data} = await api.post("/api/ai/enhance-job-desc",{userContent:prompt},{headers:{Authorization:token}})
      updateExperience(index,"description" , data.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setGeneratingIndex(-1)
    }
  }
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>

        <button
          onClick={addExperince}
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Plus className="size-4 text-green-600" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Content Section */}
      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">No work experience added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm space-y-4 hover:border-gray-300 transition-colors"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <h4 className="text-sm font-semibold text-gray-700">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove Experience"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs Grid (Fixed alignment and classes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Company Name</label>
                  <input
                    value={experience.company || ""}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Google"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Job Title</label>
                  <input
                    value={experience.position || ""}
                    onChange={(e) =>
                      // Keeping "position" matching your input logic
                      updateExperience(index, "position", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Software Engineer"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Start Date</label>
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                    type="month"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">End Date</label>
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    type="month"
                    disabled={experience.is_current}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) => {
                      updateExperience(
                        index,
                        "is_current",
                        e.target.checked ? true : false
                      );
                    }}
                    className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 size-4 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    I currently work here
                  </span>
                </label>
              </div>

              {/* Description Section */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">
                    Job Description
                  </label>
                  <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company}
                    type="button"
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 rounded-lg hover:bg-purple-100 transition-all shadow-sm"
                  >
                    {generatingIndex === index ? (<Loader2 className="w-3 h-3 animate-spin"/>) :(<Sparkles className="w-3 h-3 text-purple-600" />)}
                    
                    <span>Enhance With AI</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm placeholder:text-gray-400"
                  placeholder="Describe your key responsibilities, projects, and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;