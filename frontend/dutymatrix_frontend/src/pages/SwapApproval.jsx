import { useEffect, useState } from "react";
import api from "../api/axios";

const SwapApproval = () => {
  const [pendingSwaps, setPendingSwaps] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch pending swap requests
  const loadPendingSwaps = async () => {
    try {
      const res = await api.get("/swaps/pending");
      setPendingSwaps(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load pending swaps ❌");
    }
  };

  useEffect(() => {
    loadPendingSwaps();
  }, []);

  // 🔹 Approve swap
  const approveSwap = async (swapId) => {
    try {
      await api.put(`/swaps/${swapId}/approve`);
      setMessage("Swap approved ✅");
      loadPendingSwaps(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || "Approve failed ❌");
    }
  };

  // 🔹 Reject swap
  const rejectSwap = async (swapId) => {
    try {
      await api.put(`/swaps/${swapId}/reject`);
      setMessage("Swap rejected ❌");
      loadPendingSwaps(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || "Reject failed ❌");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Pending Shift Swap Requests</h2>

      {message && <p>{message}</p>}

      {pendingSwaps.length === 0 ? (
        <p>No pending swap requests</p>
      ) : (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Swap ID</th>
              <th>Requesting Officer</th>
              <th>Target Officer</th>
              <th>Shift Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingSwaps.map((swap) => (
              <tr key={swap.swapId}>
                <td>{swap.swapId}</td>
                <td>{swap.requestingUser}</td>
                <td>{swap.targetUser}</td>
                <td>{swap.shiftType}</td>
                <td>
                  <button onClick={() => approveSwap(swap.swapId)}>
                    Approve
                  </button>
                  &nbsp;
                  <button onClick={() => rejectSwap(swap.swapId)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SwapApproval;
