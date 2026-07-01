import { FolderGit2, Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
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
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your personal or professional projects</p>
        </div>

        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="size-4 text-blue-600" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Content Section */}
      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <FolderGit2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium">No projects added yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Click "Add Project" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm space-y-4 hover:border-gray-300 transition-colors"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <h4 className="text-sm font-semibold text-gray-700">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove Project"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Project Name
                  </label>
                  <input
                    value={project.name || ""}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. E-Commerce Platform"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Project Type / Technologies */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Type / Tech Stack
                  </label>
                  <input
                    value={project.type || ""}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Full Stack (React & Node.js)"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Description Section */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-gray-600">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    className="w-full text-sm px-3.5 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm placeholder:text-gray-400"
                    placeholder="Describe the project goal, your role, and the impact or results..."
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

export default ProjectForm;