import { useContext } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import DashboardSummary from '../../Components/Dashboard/DashboardSummary'
import Books from '../Books/Books'
import Users from '../Users/Users'
import Admins from '../Admins/Admins'
import Notifications from '../Notifications/Notifications'
import Records from '../Records/Records'
import Settings from '../Settings/Settings'
import Help from '../Help/Help'
import appContext from '../../Contexts/AppContext'

const Dashboard = () => {
  const { sideActive ,setProfilePop,profilePop} = useContext(appContext);
  const handleClickProfile=()=>{
   return profilePop?setProfilePop(false):""
  }
  const renderContent = () => {
    switch(sideActive) {
      case 0: return <DashboardSummary />;
      case 1: return <Books embedded={true} />;
      case 2: return <Admins embedded={true} />;
      case 3: return <Users embedded={true} />;
      case 4: return <Notifications embedded={true} />;
      case 5: return <Records embedded={true} />;
      case 6: return <Settings embedded={true} />;
      case 7: return <Help embedded={true} />;
      default: return <DashboardSummary />;
    }
  };

  return (
    <div onClick={()=>handleClickProfile()} className='w-full overflow-hidden h-full flex flex-col'>
        <Navbar/>
        <div className='w-full flex flex-1 overflow-hidden relative'>
           <Sidebar/>
           <div className='flex-1 overflow-auto'>
             {renderContent()}
           </div>
        </div>
    </div>
  )
}

export default Dashboard
