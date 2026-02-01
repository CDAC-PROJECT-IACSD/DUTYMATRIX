import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import '../styles/dashboard.css'

export default function StationInchargeDashboard() {
  const { user, token } = useAuth();
  
  const [firs, setFirs] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Assignment State
  const [assigningId, setAssigningId] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState('');

  useEffect(() => {
    if(user?.station?.sid) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const stationId = user.station.sid;
      
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };

      // Fetch FIRs and Officers in parallel
      const [firsRes, officersRes] = await Promise.all([
        axios.get(`http://localhost:8080/fir/station/${stationId}`, config),
        axios.get(`http://localhost:8080/users/station/${stationId}`, config)
      ]);

      setFirs(firsRes.data);
      setOfficers(officersRes.data);
      
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (firId) => {
    if (!selectedOfficer) return;
    
    try {
      await axios.put(`http://localhost:8080/fir/${firId}/assign`, null, {
        params: { officerId: selectedOfficer },
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Refresh list after assignment
      fetchDashboardData();
      setAssigningId(null);
      setSelectedOfficer('');
      
    } catch (err) {
      console.error(err);
      alert("Failed to assign officer");
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Station Incharge Dashboard</h3>
      <h3 className="welcome-message">Welcome {user?.userName} | {user?.station?.sname}</h3>

      {error && <div className="alert alert-danger text-center w-75 mx-auto">{error}</div>}
      {loading ? (
          <div className="text-center text-white mt-5">
              <div className="spinner-border" role="status"></div>
              <p>Loading station data...</p>
          </div>
      ) : (
          <div className="card w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
               <span><i className="bi bi-list-columns me-2"></i> Station FIR Registry</span>
               <button className="btn btn-sm btn-outline-primary" onClick={fetchDashboardData}>
                 <i className="bi bi-arrow-clockwise"></i> Refresh
               </button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>FIR ID</th>
                    <th>Status</th>
                    <th>Complainant / Accused</th>
                    <th>Filed By</th>
                    <th>Investigating Officer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {firs.length === 0 ? (
                      <tr><td colspan="6" className="text-center p-4">No FIRs found for this station.</td></tr>
                  ) : (
                      firs.map(fir => (
                        <tr key={fir.firId}>
                          <td><strong>#{fir.firId}</strong></td>
                          <td>
                            <span className={`badge ${fir.status === 'FILED' ? 'bg-danger' : 'bg-warning'}`}>
                              {fir.status}
                            </span>
                          </td>
                          <td>
                            {/* We don't have complainant name in the DTO currently, might need update if essential */}
                            <small className="d-block text-muted">Filed By User ID: {fir.filedBy}</small>
                          </td>
                          <td>{fir.filedBy}</td>
                          <td>
                            {fir.investigatingOfficer === 'Not Assigned' ? (
                                <span className="text-danger fw-bold"><i className="bi bi-exclamation-circle"></i> Unassigned</span>
                            ) : (
                                <span className="text-success fw-bold"><i className="bi bi-person-badge"></i> {fir.investigatingOfficer}</span>
                            )}
                          </td>
                          <td>
                             {fir.investigatingOfficer === 'Not Assigned' && (
                                 assigningId === fir.firId ? (
                                     <div className="d-flex gap-2">
                                         <select 
                                            className="form-select form-select-sm"
                                            value={selectedOfficer}
                                            onChange={(e) => setSelectedOfficer(e.target.value)}
                                         >
                                             <option value="">Select Officer</option>
                                             {officers.map(off => (
                                                 <option key={off.userId} value={off.userId}>
                                                    {off.name} ({off.rank})
                                                 </option>
                                             ))}
                                         </select>
                                         <button className="btn btn-sm btn-success" onClick={() => handleAssign(fir.firId)}>
                                             <i className="bi bi-check"></i>
                                         </button>
                                         <button className="btn btn-sm btn-secondary" onClick={() => setAssigningId(null)}>
                                             <i className="bi bi-x"></i>
                                         </button>
                                     </div>
                                 ) : (
                                     <button 
                                        className="btn btn-sm btn-primary"
                                        onClick={() => setAssigningId(fir.firId)}
                                     >
                                        Assign Officer
                                     </button>
                                 )
                             )}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
      )}
    </div>
  )
}
