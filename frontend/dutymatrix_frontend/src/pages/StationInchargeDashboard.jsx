import { useAuth } from '../auth/AuthContext'

export default function StationInchargeDashboard() {

    const {user} = useAuth();
  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Station Incharge Dashboard</h3>
      <h3 className="welcome-message">Welcome {user.userName}</h3>
    </div>
  )
}
