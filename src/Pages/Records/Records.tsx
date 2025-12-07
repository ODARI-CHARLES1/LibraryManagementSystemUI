import { useState, useContext } from "react";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import appContext from '../../Contexts/AppContext';
import CategoriesManagement from './CategoriesManagement';
import BorrowRecordsManagement from './BorrowRecordsManagement';

const Records = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  const [activeTab, setActiveTab] = useState<'categories' | 'borrow-records'>('categories');

  return (
    <div className="w-full h-full flex flex-col items-center gap-1">
      {!embedded && <Navbar />}
      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}
        <div className="w-full flex flex-col lg:flex-nowrap flex-wrap gap-5 p-8 overflow-x-hidden overflow-y-auto items-start">
          <div className="w-full flex flex-col gap-4">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Records Management</h1>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 rounded-md ${activeTab === 'categories' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('borrow-records')}
                className={`px-4 py-2 rounded-md ${activeTab === 'borrow-records' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Borrow Records
              </button>
            </div>
          </div>

          <div className="w-full">
            {activeTab === 'categories' && <CategoriesManagement embedded={true} />}
            {activeTab === 'borrow-records' && <BorrowRecordsManagement embedded={true} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;