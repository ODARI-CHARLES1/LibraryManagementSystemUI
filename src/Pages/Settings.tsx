import { useContext } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import appContext from '../Contexts/AppContext';

const Settings = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme, setTheme } = useContext(appContext);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Settings</h1>
          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Theme</h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>Choose your preferred theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
            <div className="mt-4">
              <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>Current theme: {theme}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;