import { useState } from "react";
import api from "../api/axios";

export default function SwapApprovalManual() {
  const [swapId, setSwapId] = useState("");
  const [message, setMessage] = useState("");

  const approveSwap = async () => {
    try {
      await api.put(`/swaps/${swapId}/approve`, null, {
        responseType: "text",
      });
      setMessage("Swap approved successfully ✅");
      setSwapId("");
    } catch (err) {
      setMessage("Approval failed ❌");
    }
  };

  const rejectSwap = async () => {
    try {
      await api.put(`/swaps/${swapId}/reject`, null, {
        responseType: "text",
      });
      setMessage("Swap rejected ❌");
      setSwapId("");
    } catch (err) {
      setMessage("Rejection failed ❌");
    }
  };

  return (
    <div className="card p-4 mt-3">
      <h5 className="fw-bold mb-3">Swap Approval</h5>

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Enter Swap ID"
        value={swapId}
        onChange={(e) => setSwapId(e.target.value)}
      />

      <div>
        <button
          className="btn btn-success me-2"
          onClick={approveSwap}
          disabled={!swapId}
        >
          Approve
        </button>

        <button
          className="btn btn-danger"
          onClick={rejectSwap}
          disabled={!swapId}
        >
          Reject
        </button>
      </div>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
