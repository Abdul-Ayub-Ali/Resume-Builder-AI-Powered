import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } },
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          {/* fixed "items center" to "items-center" */}
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a summary for your resume here
          </p>
        </div>

        <button disabled={isGenerating} onClick={generateSummary} 
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full shadow-sm hover:shadow transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
        >
          {isGenerating? (<Loader2 className="size-4 animate-spin"/>) : (<Sparkles className="size-4 "/>)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-4">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full p-3.5 border text-sm border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none shadow-sm placeholder:text-gray-400"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-400 mt-2 text-center">
          <span className="font-medium text-gray-500">Tip:</span> Keep it
          concise (3-4 sentences) and focus on your most relevant achievements
          and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
