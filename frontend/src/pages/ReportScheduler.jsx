import { useEffect, useState } from "react";
import {
  scheduleReport,
  getScheduledReports,
} from "../services/executiveReportService";

function ReportScheduler() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    report_type: "",
    frequency: "Monthly",
    email: "",
    project_id: "",
  });

  const loadReports = async () => {
    try {
      const data = await getScheduledReports();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Scheduled Reports Error:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await scheduleReport({
        ...form,
        project_id: Number(form.project_id),
      });

      setMessage("Report scheduled successfully");

      setForm({
        report_type: "",
        frequency: "Monthly",
        email: "",
        project_id: "",
      });

      loadReports();
    } catch (error) {
      console.log("Schedule Report Error:", error);
      setMessage("Failed to schedule report");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Report Scheduler
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Schedule executive reports and automated business summaries.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Create Report Schedule
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            placeholder="Report Type"
            value={form.report_type}
            onChange={(e) =>
              setForm({
                ...form,
                report_type: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <select
            value={form.frequency}
            onChange={(e) =>
              setForm({
                ...form,
                frequency: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
          </select>

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <input
            placeholder="Project ID"
            value={form.project_id}
            onChange={(e) =>
              setForm({
                ...form,
                project_id: e.target.value,
              })
            }
            className="bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 border border-green-300 dark:border-gray-700 p-3 rounded-xl outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Schedule
          </button>
        </form>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Scheduled Reports
        </h2>

        <div className="overflow-x-auto rounded-xl border border-green-200 dark:border-gray-700">
          <table className="w-full min-w-[800px] bg-white dark:bg-[#1e1e1e]">
            <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
              <tr>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Report
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Frequency
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="p-3 text-left text-gray-900 dark:text-white">
                  Next Run
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 dark:text-gray-300"
                  >
                    No scheduled reports available
                  </td>
                </tr>
              ) : (
                reports.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.report_type}
                    </td>

                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.frequency}
                    </td>

                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.email}
                    </td>

                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {item.next_run
                        ? new Date(item.next_run).toLocaleString()
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

export default ReportScheduler;