import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProject,
  getProjects,
  deleteProject,
} from "../services/forecastProjectService";

function ForecastProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    project_name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Projects Error:", error);
      setMessage("Failed to load forecast projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.project_name.trim()) {
      setMessage("Project name is required");
      return;
    }

    try {
      await createProject(form);

      setForm({
        project_name: "",
        description: "",
      });

      setMessage("Forecast project created successfully");
      loadProjects();
    } catch (error) {
      console.log("Create Project Error:", error);
      setMessage("Failed to create forecast project");
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      setMessage("Project deleted successfully");
      loadProjects();
    } catch (error) {
      console.log("Delete Project Error:", error);
      setMessage("Failed to delete project");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Forecast Projects
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Create and manage forecasting workspaces for datasets, forecasts,
          reports, scenarios, and collaboration.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Create Forecast Project
        </h2>

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={form.project_name}
            onChange={(e) =>
              setForm({
                ...form,
                project_name: e.target.value,
              })
            }
            placeholder="Project Name"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Project Description"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Create Project
          </button>
        </form>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white">
            Project Workspaces
          </h2>

          <button
            onClick={loadProjects}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-300">
            No forecast projects available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-[#123f1f] dark:text-white">
                  {project.project_name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {project.description || "No description"}
                </p>

                <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                  Status: {project.status || "Active"}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => navigate(`/forecast-projects/${project.id}`)}
                    className="bg-[#9dff00] text-[#032b11] px-4 py-2 rounded-lg font-bold"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForecastProjects;