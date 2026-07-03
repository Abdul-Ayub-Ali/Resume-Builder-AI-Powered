import { useParams, Link } from "react-router-dom"; // Link import kiya standard navigation ke liye
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react"; // FIX: useState import kiya
import ResumePreview from "../components/ResumePreview";
import { ArrowLeftIcon, Loader } from "lucide-react";
import api from "../config/api";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white shadow-md rounded-lg"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      {isLoading ? (
        <Loader className="animate-spin size-8 text-blue-600" />
      ) : (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-3xl md:text-5xl text-slate-400 font-semibold tracking-tight">
            Resume not found
          </p>

          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <ArrowLeftIcon className="size-4" />
            Go to home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Preview;
