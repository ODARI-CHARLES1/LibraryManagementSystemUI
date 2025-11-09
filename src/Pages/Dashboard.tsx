import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
  return (
    <div className='w-full h-screen gap-1  flex flex-col items-center'>
        <Navbar/>
        <div className='w-full h-screen'>
          <Sidebar/>
        </div>
    </div>
  )
}

export default Dashboard
