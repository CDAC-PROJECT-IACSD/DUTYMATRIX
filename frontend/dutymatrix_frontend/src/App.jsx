import {Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import PoliceOfficerDashboard from './pages/PoliceOfficerDashboard'
import StationInchargeDashboard from './pages/StationInchargeDashboard'
import CommissionerDashboard from './pages/CommissionerDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/dashboard/officer' element={<PoliceOfficerDashboard/>} />
      <Route path='/dashboard/stationIncharge' element={<StationInchargeDashboard/>} />
      <Route path='/dashboard/commissioner' element={<CommissionerDashboard/>} />
    </Routes>
  )
}

export default App
