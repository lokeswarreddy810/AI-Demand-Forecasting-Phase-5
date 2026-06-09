import { useEffect, useState } from "react";

import {
  addComment,
  getComments,
  shareReport,
  addRevision,
  getRevisions,
  getTimeline,
} from "../services/collaborationService";

function Collaboration() {
  const [projectId, setProjectId] = useState("");
  const [comments, setComments] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [message, setMessage] = useState("");

  const [commentForm, setCommentForm] = useState({
    project_id: "",
    forecast_id: "",
    comment: "",
  });

  const [shareForm, setShareForm] = useState({
    report_name: "",
    shared_with: "",
    project_id: "",
  });

  const [revisionForm, setRevisionForm] = useState({
    forecast_id: "",
    project_id: "",
    old_value: "",
    new_value: "",
    change_summary: "",
  });

  const loadCollaborationData = async () => {
    if (!projectId) {
      setMessage("Enter Project ID first");
      return;
    }

    try {
      const commentData = await getComments(projectId);
      const revisionData = await getRevisions(projectId);
      const timelineData = await getTimeline(projectId);

      setComments(Array.isArray(commentData) ? commentData : []);
      setRevisions(Array.isArray(revisionData) ? revisionData : []);
      setTimeline(Array.isArray(timelineData) ? timelineData : []);
      setMessage("Collaboration data loaded");
    } catch (error) {
      console.log("Collaboration Load Error:", error);
      setMessage("Failed to load collaboration data");
    }
  };

  useEffect(() => {
    if (projectId) {
      setCommentForm((prev) => ({
        ...prev,
        project_id: Number(projectId),
      }));

      setShareForm((prev) => ({
        ...prev,
        project_id: Number(projectId),
      }));

      setRevisionForm((prev) => ({
        ...prev,
        project_id: Number(projectId),
      }));
    }
  }, [projectId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      await addComment({
        project_id: Number(commentForm.project_id),
        forecast_id: commentForm.forecast_id
          ? Number(commentForm.forecast_id)
          : null,
        comment: commentForm.comment,
      });

      setCommentForm({
        project_id: Number(projectId),
        forecast_id: "",
        comment: "",
      });

      setMessage("Comment added successfully");
      loadCollaborationData();
    } catch (error) {
      console.log("Add Comment Error:", error);
      setMessage("Failed to add comment");
    }
  };

  const handleShareReport = async (e) => {
    e.preventDefault();

    try {
      await shareReport({
        report_name: shareForm.report_name,
        shared_with: shareForm.shared_with,
        project_id: Number(shareForm.project_id),
      });

      setShareForm({
        report_name: "",
        shared_with: "",
        project_id: Number(projectId),
      });

      setMessage("Report shared successfully");
    } catch (error) {
      console.log("Share Report Error:", error);
      setMessage("Failed to share report");
    }
  };

  const handleAddRevision = async (e) => {
    e.preventDefault();

    try {
      await addRevision({
        forecast_id: Number(revisionForm.forecast_id),
        project_id: Number(revisionForm.project_id),
        old_value: revisionForm.old_value,
        new_value: revisionForm.new_value,
        change_summary: revisionForm.change_summary,
      });

      setRevisionForm({
        forecast_id: "",
        project_id: Number(projectId),
        old_value: "",
        new_value: "",
        change_summary: "",
      });

      setMessage("Revision added successfully");
      loadCollaborationData();
    } catch (error) {
      console.log("Add Revision Error:", error);
      setMessage("Failed to add revision");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Forecast Collaboration
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Add comments, share reports, track revisions, and view forecasting
          activity timeline.
        </p>
      </div>

      <Section title="Select Forecast Project">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter Project ID"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={loadCollaborationData}
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Load Collaboration
          </button>
        </div>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Add Forecast Comment">
          <form onSubmit={handleAddComment} className="space-y-4">
            <input
              value={commentForm.forecast_id}
              onChange={(e) =>
                setCommentForm({
                  ...commentForm,
                  forecast_id: e.target.value,
                })
              }
              placeholder="Forecast ID Optional"
              className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />

            <textarea
              value={commentForm.comment}
              onChange={(e) =>
                setCommentForm({
                  ...commentForm,
                  comment: e.target.value,
                })
              }
              placeholder="Write comment"
              rows="4"
              className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
            >
              Add Comment
            </button>
          </form>
        </Section>

        <Section title="Share Forecast Report">
          <form onSubmit={handleShareReport} className="space-y-4">
            <input
              value={shareForm.report_name}
              onChange={(e) =>
                setShareForm({
                  ...shareForm,
                  report_name: e.target.value,
                })
              }
              placeholder="Report Name"
              className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />

            <input
              value={shareForm.shared_with}
              onChange={(e) =>
                setShareForm({
                  ...shareForm,
                  shared_with: e.target.value,
                })
              }
              placeholder="Share With Email"
              className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="bg-[#123f1f] text-white px-6 py-3 rounded-xl font-bold"
            >
              Share Report
            </button>
          </form>
        </Section>
      </div>

      <Section title="Add Forecast Revision">
        <form onSubmit={handleAddRevision} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            value={revisionForm.forecast_id}
            onChange={(e) =>
              setRevisionForm({
                ...revisionForm,
                forecast_id: e.target.value,
              })
            }
            placeholder="Forecast ID"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            value={revisionForm.old_value}
            onChange={(e) =>
              setRevisionForm({
                ...revisionForm,
                old_value: e.target.value,
              })
            }
            placeholder="Old Value"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            value={revisionForm.new_value}
            onChange={(e) =>
              setRevisionForm({
                ...revisionForm,
                new_value: e.target.value,
              })
            }
            placeholder="New Value"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            value={revisionForm.change_summary}
            onChange={(e) =>
              setRevisionForm({
                ...revisionForm,
                change_summary: e.target.value,
              })
            }
            placeholder="Change Summary"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Save Revision
          </button>
        </form>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DataPanel
          title="Comments"
          data={comments}
          empty="No comments available"
          render={(item) => (
            <>
              <p className="font-bold">{item.comment}</p>
              <p className="text-sm text-gray-500">
                Forecast ID: {item.forecast_id || "N/A"}
              </p>
            </>
          )}
        />

        <DataPanel
          title="Revision History"
          data={revisions}
          empty="No revisions available"
          render={(item) => (
            <>
              <p className="font-bold">{item.change_summary}</p>
              <p className="text-sm text-gray-500">
                Old: {item.old_value || "N/A"} | New: {item.new_value || "N/A"}
              </p>
            </>
          )}
        />

        <DataPanel
          title="Activity Timeline"
          data={timeline}
          empty="No timeline available"
          render={(item) => (
            <>
              <p className="font-bold">{item.type}</p>
              <p className="text-sm text-gray-500">{item.message}</p>
            </>
          )}
        />
      </div>
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

function DataPanel({ title, data, empty, render }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-[#123f1f] dark:text-white mb-5">
        {title}
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">{empty}</p>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-200 dark:border-gray-700 p-4 rounded-xl"
            >
              {render(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collaboration;