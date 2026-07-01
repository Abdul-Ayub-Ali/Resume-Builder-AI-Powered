import { Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react"; 

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button 
          onClick={addSkill} 
          disabled={!newSkill.trim()}
          className="flex items-center justify-center p-2.5 text-blue-700 bg-blue-50 hover:bg-blue-100 disabled:bg-gray-50 disabled:text-gray-400 border border-blue-200 disabled:border-gray-200 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="size-5" />
        </button>
      </div>

      {/* Skills Badges Content Section */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-4 border border-gray-100 rounded-2xl bg-gray-50/30">
          {data.map((skill, index) => (
            <span 
              key={index}
              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 rounded-xl shadow-sm animate-fade-in"
            >
              {skill}
              <button 
                onClick={() => removeSkill(index)}
                className="p-0.5 text-blue-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                type="button"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">No skills added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add your technical and soft skills above.</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
        <p className="text-xs text-amber-800 leading-relaxed"> 
          <strong className="font-semibold text-amber-900 block mb-0.5">Tips:</strong> 
          Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication). 
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;