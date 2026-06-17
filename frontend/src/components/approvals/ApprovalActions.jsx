function ApprovalActions({ approval, onApprove, onReject }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onApprove(approval.id)}
        className="bg-[#9dff00] text-[#032b11] px-4 py-2 rounded-xl font-bold"
      >
        Approve
      </button>

      <button
        onClick={() => onReject(approval.id)}
        className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
      >
        Reject
      </button>
    </div>
  );
}

export default ApprovalActions;