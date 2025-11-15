import { useContext } from 'react';
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import DashboardSummary from '../Components/DashboardSummary'
import Books from './Books'
import Users from './Users'
import Admins from './Admins'
import Notifications from './Notifications'
import Records from './Records'
import Settings from './Settings'
import Help from './Help'
import appContext from '../Contexts/AppContext'

const Dashboard = () => {
  const { sideActive } = useContext(appContext);

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
    <div className='w-full overflow-hidden h-full flex flex-col'>
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
