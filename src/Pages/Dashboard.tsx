import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import DashboardSummary from '../Components/DashboardSummary'

const Dashboard = () => {
  return (
    <div className='w-full h-screen gap-1  flex flex-col items-center'>
        <Navbar/>
        <div className='w-full h-screen flex gap-5'>
          <Sidebar/>
          <DashboardSummary/>
        </div>
    </div>
  )
}

export default Dashboard
