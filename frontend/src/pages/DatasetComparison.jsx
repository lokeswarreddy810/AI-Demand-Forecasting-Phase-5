import { useState } from "react";
import { compareDatasets } from "../services/datasetManagementService";

function DatasetComparison() {
  const [projectId, setProjectId] = useState("");
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadComparison = async () => {
    if (!projectId) {
      setMessage("Please enter Project ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setComparison(null);

      const data = await compareDatasets(projectId);

      console.log("Dataset comparison data:", data);

      const versions = Array.isArray(data) ? data : data?.data || [];

      if (versions.length === 0) {
        setMessage("No dataset versions found");
        return;
      }

      setComparison({
        latest_version: versions[0]
          ? `${versions[0].dataset_name} - Version ${versions[0].version_number}`
          : "N/A",

        previous_version: versions[1]
          ? `${versions[1].dataset_name} - Version ${versions[1].version_number}`
          : "N/A",

        differences: {
          latest_dataset_name: versions[0]?.dataset_name || "N/A",
          previous_dataset_name: versions[1]?.dataset_name || "N/A",
          latest_file: versions[0]?.file_name || "N/A",
          previous_file: versions[1]?.file_name || "N/A",
          latest_status: versions[0]?.status || "N/A",
          previous_status: versions[1]?.status || "N/A",
          latest_uploaded_by: versions[0]?.uploaded_by || "N/A",
          previous_uploaded_by: versions[1]?.uploaded_by || "N/A",
          latest_created_at: versions[0]?.created_at || "N/A",
          previous_created_at: versions[1]?.created_at || "N/A",
        },

        summary:
          versions.length >= 2
            ? `Compared Version ${versions[0].version_number} with Version ${versions[1].version_number}`
            : "Only one dataset version found",
      });
    } catch (error) {
      console.log("Dataset Comparison Error:", error);
      setMessage("Failed to load dataset comparison");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Dataset Comparison
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Compare dataset versions and identify changes.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            onClick={loadComparison}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] disabled:opacity-60 text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            {loading ? "Loading..." : "Compare"}
          </button>
        </div>

        {message && (
          <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}

        {!loading && comparison && (
          <div className="space-y-6">
            <InfoBox
              title="Latest Version"
              value={comparison.latest_version}
              variant="green"
            />

            <InfoBox
              title="Previous Version"
              value={comparison.previous_version}
              variant="blue"
            />

            <div className="bg-yellow-50 dark:bg-[#3b2f10] border border-yellow-200 dark:border-yellow-700 p-5 rounded-xl">
              <h3 className="font-bold text-xl mb-2 text-[#123f1f] dark:text-white">
                Differences
              </h3>

              <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-[#111827] p-4 rounded-xl overflow-x-auto">
                {JSON.stringify(comparison.differences, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 p-5 rounded-xl">
              <h3 className="font-bold text-xl mb-2 text-[#123f1f] dark:text-white">
                Summary
              </h3>

              <p className="text-gray-700 dark:text-gray-200">
                {comparison.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ title, value, variant }) {
  const styles =
    variant === "blue"
      ? "bg-blue-50 dark:bg-[#1f2937] border-blue-200 dark:border-gray-700"
      : "bg-green-50 dark:bg-[#123f1f] border-green-200 dark:border-gray-700";

  return (
    <div className={`${styles} border p-5 rounded-xl`}>
      <h3 className="font-bold text-xl mb-2 text-[#123f1f] dark:text-white">
        {title}
      </h3>

      <p className="text-gray-700 dark:text-gray-200">{value}</p>
    </div>
  );
}

export default DatasetComparison;