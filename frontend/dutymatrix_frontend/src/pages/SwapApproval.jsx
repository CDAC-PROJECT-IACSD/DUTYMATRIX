import { useState } from "react";
import api from "../api/axios";
import "../styles/swap_approval.css";
import { Hash, Check, X, RefreshCcw } from "lucide-react";

export default function SwapApprovalManual() {
  const [swapId, setSwapId] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const approveSwap = async () => {
    setLoading(true);
    try {
      await api.put(`/swaps/${swapId}/approve`, null, {
        responseType: "text",
      });
      setMessage("Swap request approved successfully! ✅");
      setIsError(false);
      setSwapId("");
    } catch (err) {
      setMessage("Failed to approve swap ❌");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const rejectSwap = async () => {
    setLoading(true);
    try {
      await api.put(`/swaps/${swapId}/reject`, null, {
        responseType: "text",
      });
      setMessage("Swap request rejected ❌");
      setIsError(false);
      setSwapId("");
    } catch (err) {
      setMessage("Failed to reject swap ❌");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="swap-approval-container">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <RefreshCcw className="text-warning me-3" size={32} />
        <h3 className="swap-title mb-0">Shift Swap Portal</h3>
      </div>

      <div className="swap-input-group">
        <label className="swap-label">Request ID</label>
        <div className="swap-field-wrapper">
          <Hash className="text-gray me-2" size={20} />
          <input
            type="number"
            className="swap-input"
            placeholder="Enter digital Swap ID..."
            value={swapId}
            onChange={(e) => setSwapId(e.target.value)}
          />
        </div>
      </div>

      <div className="swap-btn-group">
        <button
          className="btn-swap-approve d-flex align-items-center justify-content-center gap-2"
          onClick={approveSwap}
          disabled={!swapId || loading}
        >
          <Check size={18} /> Approve
        </button>

        <button
          className="btn-swap-reject d-flex align-items-center justify-content-center gap-2"
          onClick={rejectSwap}
          disabled={!swapId || loading}
        >
          <X size={18} /> Reject
        </button>
      </div>

      {message && (
        <div className={`status-msg-custom mt-4 text-center p-2 rounded ${isError ? 'msg-error' : 'msg-success'}`} style={{fontSize: '0.9rem'}}>
          {message}
        </div>
      )}
    </div>
  );
}
