import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import { useContext } from 'react';
import appContext from '../Contexts/AppContext';

const Admins = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  
  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Admins Management</h1>
          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Admin management functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;