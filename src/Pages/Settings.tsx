import { useContext } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
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
          <h1 className="text-3xl font-semibold text-[#313131]">Settings</h1>
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Theme</h3>
                <p className="text-gray-600">Choose your preferred theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Current theme: {theme}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;