import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const Admins = ({ embedded = false }: { embedded?: boolean }) => {
  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <h1 className="text-3xl font-semibold text-[#313131]">Admins Management</h1>
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Admin management functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;