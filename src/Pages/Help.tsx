import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import { useContext } from 'react';
import appContext from '../Contexts/AppContext';

const Help = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  
  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Help & Support</h1>
          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className={`p-2 cursor-pointer rounded-md ${theme === "light" ? "hover:shadow-md shadow-green-100 hover:bg-green-50" : "hover:bg-gray-700"}`}>
                <h3 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>How do I add a new book?</h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Go to the Books page and click "Add Book" button.</p>
              </div>
              <div className={`p-2 cursor-pointer rounded-md ${theme === "light" ? "hover:shadow-md shadow-green-100 hover:bg-green-50" : "hover:bg-gray-700"}`}>
                <h3 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>How do I manage users?</h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Visit the Users page to add, edit, or remove users.</p>
              </div>
              <div className={`p-2 cursor-pointer rounded-md ${theme === "light" ? "hover:shadow-md shadow-green-100 hover:bg-green-50" : "hover:bg-gray-700"}`}>
                <h3 className={`font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>How to change theme?</h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Use the theme toggle button in the navbar or go to Settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;