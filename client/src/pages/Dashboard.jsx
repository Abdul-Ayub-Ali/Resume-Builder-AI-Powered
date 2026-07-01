import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();
  
  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    setTitle("");
    navigate(`/app/builder/new`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    setTitle("");
    setResume(null);
    navigate(`/app/builder/uploaded`);
  };

  const editTitle = async (event) => {
    event.preventDefault();
    setAllResumes((prev) =>
      prev.map((res) => (res._id === editResumeId ? { ...res, title: title } : res))
    );
    setEditResumeId("");
    setTitle("");
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        {/* Top Buttons: Create & Upload */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full " />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloud className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resumes Grid/List */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-3 border group hover:shadow-lg transition-all duration-300 cursor-pointer p-4"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenIcon
                  className="size-8 group-hover:scale-110 transition-all duration-300"
                  style={{ color: baseColor }}
                />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center">
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                
                {/* Action Popovers (Trash / Pencil) */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden z-10"
                >
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer" />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => {
              setShowCreateResume(false);
              setTitle(""); // FIXED: cleanup on outside click
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-white border border-slate-200 shadow-xl rounded-2xl w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                Create a New Resume
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer Resume"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-600 outline-none transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-md"
                >
                  Get Started
                </button>
              </div>
              <XIcon
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors size-6"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => {
              setShowUploadResume(false);
              setTitle("");
              setResume(null); // FIXED: Outside click resets state completely
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-white border border-slate-200 shadow-xl rounded-2xl w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                Upload Resume
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer Resume"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-600 outline-none transition-all duration-200"
                  required
                />
                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm text-slate-700 font-medium mb-2"
                  >
                    Select resume file
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                  />

                  <label
                    htmlFor="resume-input"
                    className="flex flex-col items-center justify-center text-center gap-2 border border-slate-300 border-dashed rounded-xl p-6 py-10 my-2 hover:border-green-500 hover:text-green-700 bg-slate-50/50 cursor-pointer transition-all duration-200 group"
                  >
                    {resume ? (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-200 break-all">
                          📎 {resume.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="size-12 stroke-[1.5] text-slate-400 group-hover:text-green-600 transition-colors duration-200 mx-auto" />
                        <p className="text-sm text-slate-500 group-hover:text-green-700 transition-colors duration-200">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-slate-400">
                          PDF, DOCX up to 5MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-md"
                >
                  Upload Resume
                </button>
              </div>
              <XIcon
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors size-6"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => {
              setEditResumeId("");
              setTitle("");
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-white border border-slate-200 shadow-xl rounded-2xl w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                Edit resume title
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer Resume"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-600 outline-none transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-md"
                >
                  Update
                </button>
              </div>
              <XIcon
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors size-6"
                onClick={() => {
                  setEditResumeId("");
                  setTitle(""); // FIXED: Properly flushing modal values
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;