import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getProjectById,
  getProjectActivities,
  getProjectPermissions,
  addProjectPermission,
  deleteProjectPermission,
} from "../services/forecastProjectService";

function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [permissionForm, setPermissionForm] = useState({
    project_id: Number(projectId),
    user_id: "",
    role: "Viewer",
  });
  const [message, setMessage] = useState("");

  const loadProjectDetails = async () => {
    try {
      const projectData = await getProjectById(projectId);
      const activityData = await getProjectActivities(projectId);
      const permissionData = await getProjectPermissions(projectId);

      setProject(projectData);
      setActivities(Array.isArray(activityData) ? activityData : []);
      setPermissions(Array.isArray(permissionData) ? permissionData : []);
    } catch (error) {
      console.log("Project Details Error:", error);
      setMessage("Failed to load project details");
    }
  };

  useEffect(() => {
    loadProjectDetails();
  }, [projectId]);

  const handlePermissionSubmit = async (e) => {
    e.preventDefault();

    if (!permissionForm.user_id) {
      setMessage("User ID is required");
      return;
    }

    try {
      await addProjectPermission(projectId, {
        project_id: Number(projectId),
        user_id: Number(permissionForm.user_id),
        role: permissionForm.role,
      });

      setPermissionForm({
        project_id: Number(projectId),
        user_id: "",
        role: "Viewer",
      });

      setMessage("Permission added successfully");
      loadProjectDetails();
    } catch (error) {
      console.log("Permission Error:", error);
      setMessage("Failed to add permission");
    }
  };

  const handleDeletePermission = async (permissionId) => {
    try {
      await deleteProjectPermission(permissionId);
      setMessage("Permission removed successfully");
      loadProjectDetails();
    } catch (error) {
      console.log("Delete Permission Error:", error);
      setMessage("Failed to remove permission");
    }
  };

  if (!project) {
    return (
      <div className="text-gray-500 dark:text-gray-300">
        Loading project details...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          {project.project_name}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {project.description || "Forecast workspace details"}
        </p>
      </div>

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard title="Project ID" value={project.id} />
        <InfoCard title="Owner ID" value={project.owner_id} />
        <InfoCard title="Status" value={project.status || "Active"} />
      </div>

      <Section title="Project Permissions">
        <form onSubmit={handlePermissionSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            value={permissionForm.user_id}
            onChange={(e) =>
              setPermissionForm({
                ...permissionForm,
                user_id: e.target.value,
              })
            }
            placeholder="User ID"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={permissionForm.role}
            onChange={(e) =>
              setPermissionForm({
                ...permissionForm,
                role: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Manager">Manager</option>
          </select>

          <button
            type="submit"
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Add Permission
          </button>
        </form>

        {permissions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No permissions assigned
          </p>
        ) : (
          <div className="space-y-3">
            {permissions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-4 rounded-xl"
              >
                <div>
                  <p className="font-bold text-[#123f1f] dark:text-white">
                    User ID: {item.user_id}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Role: {item.role}
                  </p>
                </div>

                <button
                  onClick={() => handleDeletePermission(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Project Activity Timeline">
        {activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No activity available
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((item) => (
              <div
                key={item.id}
                className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 p-4 rounded-xl"
              >
                <p className="font-bold text-[#123f1f] dark:text-white">
                  {item.activity}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-6 rounded-2xl shadow-md">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mt-2">
        {value}
      </h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-8 rounded-2xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default ProjectDetails;