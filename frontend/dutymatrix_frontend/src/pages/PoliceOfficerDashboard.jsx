import { useAuth } from '../auth/AuthContext'
import '../styles/dashboard.css'

export default function PoliceOfficerDashboard() {

    const {user} = useAuth();
  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Police Officer Dashboard</h3>
      <h3 className="welcome-message">Welcome {user.userName}</h3>
    </div>
  )
}
