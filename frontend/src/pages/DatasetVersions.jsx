import { useEffect, useState } from "react";
import {
  createDatasetVersion,
  getDatasetVersions,
  getUploadHistory,
  archiveDataset,
} from "../services/datasetManagementService";

function DatasetVersions() {
  const [projectId, setProjectId] = useState("");
  const [versions, setVersions] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const [versionForm, setVersionForm] = useState({
    dataset_name: "",
    version_number: 1,
    file_name: "",
    project_id: "",
  });

  const [archiveForm, setArchiveForm] = useState({
    dataset_id: "",
    reason: "",
  });

  const loadData = async () => {
    try {
      const historyData = await getUploadHistory();
      setHistory(Array.isArray(historyData) ? historyData : []);

      if (projectId) {
        const versionData = await getDatasetVersions(projectId);
        setVersions(Array.isArray(versionData) ? versionData : []);
      }
    } catch (error) {
      console.log("Dataset Versions Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const handleCreateVersion = async (e) => {
    e.preventDefault();

    try {
      await createDatasetVersion({
        ...versionForm,
        project_id: Number(versionForm.project_id),
      });

      setMessage("Dataset version created successfully");

      setVersionForm({
        dataset_name: "",
        version_number: 1,
        file_name: "",
        project_id: "",
      });

      loadData();
    } catch (error) {
      console.log("Create Version Error:", error);
      setMessage("Failed to create version");
    }
  };

  const handleArchive = async (e) => {
    e.preventDefault();

    try {
      await archiveDataset({
        dataset_id: Number(archiveForm.dataset_id),
        reason: archiveForm.reason,
      });

      setMessage("Dataset archived successfully");

      setArchiveForm({
        dataset_id: "",
        reason: "",
      });

      loadData();
    } catch (error) {
      console.log("Archive Dataset Error:", error);
      setMessage("Failed to archive dataset");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Dataset Version Management
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Track dataset versions, upload history and archives.
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-green-100 dark:bg-[#123f1f] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
            Create Dataset Version
          </h2>

          <form onSubmit={handleCreateVersion} className="space-y-4">
            <input
              placeholder="Dataset Name"
              value={versionForm.dataset_name}
              onChange={(e) =>
                setVersionForm({
                  ...versionForm,
                  dataset_name: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <input
              type="number"
              placeholder="Version Number"
              value={versionForm.version_number}
              onChange={(e) =>
                setVersionForm({
                  ...versionForm,
                  version_number: Number(e.target.value),
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <input
              placeholder="File Name"
              value={versionForm.file_name}
              onChange={(e) =>
                setVersionForm({
                  ...versionForm,
                  file_name: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <input
              placeholder="Project ID"
              value={versionForm.project_id}
              onChange={(e) =>
                setVersionForm({
                  ...versionForm,
                  project_id: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
            >
              Save Version
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
            Archive Dataset
          </h2>

          <form onSubmit={handleArchive} className="space-y-4">
            <input
              placeholder="Dataset ID"
              value={archiveForm.dataset_id}
              onChange={(e) =>
                setArchiveForm({
                  ...archiveForm,
                  dataset_id: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <textarea
              rows="4"
              placeholder="Archive Reason"
              value={archiveForm.reason}
              onChange={(e) =>
                setArchiveForm({
                  ...archiveForm,
                  reason: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
            >
              Archive
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mt-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadData}
            className="bg-[#123f1f] hover:bg-[#0d4420] text-white px-6 py-3 rounded-xl font-bold"
          >
            Load Versions
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Dataset Versions
        </h2>

        <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
          <table className="w-full min-w-[700px] bg-white dark:bg-[#1e1e1e]">
            <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Dataset
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Version
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  File
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {versions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 dark:text-gray-300"
                  >
                    No dataset versions available
                  </td>
                </tr>
              ) : (
                versions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.dataset_name}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.version_number}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.file_name || "N/A"}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Upload History
        </h2>

        <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
          <table className="w-full min-w-[700px] bg-white dark:bg-[#1e1e1e]">
            <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Dataset
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Uploaded By
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center text-gray-500 dark:text-gray-300"
                  >
                    No upload history available
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.dataset_name}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.uploaded_by}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DatasetVersions;