import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import ApprovalHistoryTable from "../components/approvals/ApprovalHistoryTable";
import ApprovalActions from "../components/approvals/ApprovalActions";

import {
  getApprovals,
  getPendingApprovals,
  approveForecast,
  rejectForecast,
} from "../services/approvalService";

function ForecastApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getApprovalId = (approval) => {
    return approval?.id || approval?.approval_id || approval?.forecast_approval_id;
  };

  const loadApprovals = async () => {
    try {
      setLoading(true);

      const approvalData = await getApprovals();
      const pendingData = await getPendingApprovals();

      console.log("All approvals:", approvalData);
      console.log("Pending approvals:", pendingData);

      setApprovals(Array.isArray(approvalData) ? approvalData : []);
      setPendingApprovals(Array.isArray(pendingData) ? pendingData : []);
    } catch (error) {
      console.log("Approval Load Error:", error.response?.data || error);
      setApprovals([]);
      setPendingApprovals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovals();
  }, []);

  const handleApprove = async (approval) => {
    try {
      const approvalId = getApprovalId(approval);

      console.log("Approve clicked approval object:", approval);
      console.log("Approving approval id:", approvalId);

      if (!approvalId) {
        setMessage("Approval ID not found");
        return;
      }

      await approveForecast(approvalId);

      setMessage("Forecast approved successfully");
      loadApprovals();
    } catch (error) {
      console.log("Approve Error:", error.response?.data || error);
      setMessage("Failed to approve forecast");
    }
  };

  const handleReject = async (approval) => {
    try {
      const approvalId = getApprovalId(approval);

      console.log("Reject clicked approval object:", approval);
      console.log("Rejecting approval id:", approvalId);

      if (!approvalId) {
        setMessage("Approval ID not found");
        return;
      }

      await rejectForecast(approvalId, "Rejected by manager");

      setMessage("Forecast rejected successfully");
      loadApprovals();
    } catch (error) {
      console.log("Reject Error:", error.response?.data || error);
      setMessage("Failed to reject forecast");
    }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <PageHeader
        title="Forecast Approvals"
        subtitle="Review, approve and reject submitted forecast requests."
      />

      {message && (
        <div className="mb-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white p-4 rounded-xl">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Approvals" value={approvals.length} />
        <SummaryCard title="Pending Approvals" value={pendingApprovals.length} />
        <SummaryCard
          title="Completed Reviews"
          value={Math.max(approvals.length - pendingApprovals.length, 0)}
        />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Pending Approval Actions
        </h2>

        {loading ? (
          <Loader />
        ) : pendingApprovals.length === 0 ? (
          <EmptyState message="No pending approvals available" />
        ) : (
          <div className="space-y-4">
            {pendingApprovals.map((approval, index) => (
              <div
                key={getApprovalId(approval) || index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl"
              >
                <div>
                  <h3 className="font-bold text-[#123f1f] dark:text-white">
                    Forecast #{approval.forecast_id}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    Organization: {approval.organization_id}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300">
                    Submitted By: {approval.submitted_by || approval.user_id || "N/A"}
                  </p>

                  {approval.comments && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Comments: {approval.comments}
                    </p>
                  )}
                </div>

                <ApprovalActions
                  approval={approval}
                  onApprove={() => handleApprove(approval)}
                  onReject={() => handleReject(approval)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-5">
          Approval History
        </h2>

        {loading ? (
          <Loader />
        ) : approvals.length === 0 ? (
          <EmptyState message="No approval history available" />
        ) : (
          <ApprovalHistoryTable approvals={approvals} />
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-green-200 dark:border-gray-700 p-6">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-[#9dff00] mt-3">
        {value}
      </h2>
    </div>
  );
}

export default ForecastApprovals;