import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { useContext } from 'react'
import appContext from '../Contexts/AppContext'

const Dashboard = () => {
    const {collapse} =useContext(appContext)
  return (
    <div className='w-full h-screen flex items-center'>
        <>
            <Sidebar/>
        </>
        <div className={`h-full items-center flex flex-col ${collapse?"lg:w-full w-full":"lg:w-5/6 w-4/6"}`}>
        <Navbar/>
        </div>
    </div>
  )
}

export default Dashboard
