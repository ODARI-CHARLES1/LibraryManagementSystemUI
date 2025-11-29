import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import appContext from "../../Contexts/AppContext";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserProfile from "../Profile/UserProfile";

const Navbar = () => {
  const { selectActive, setSelectActive, period, setPeriod, theme, setTheme, setIsAuthenticated, mobileMenuOpen, setMobileMenuOpen,profilePop,setProfilePop }=useContext(appContext);
  const navigate = useNavigate();
  const handleClickSelectActive = () => {
    setSelectActive(true);
  };
  const handleClickSetPeriod = (period: string) => {
    localStorage.setItem("Period", period);
    setPeriod(JSON.stringify(localStorage.getItem("Period")));
    setSelectActive(false);
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    navigate('/login');
  };
  return (
    <div className={`${theme=="light"?"bg-white text-gray-700":"bg-gray-900 text-[#6b6b6b]"}  w-full relative shadow-md py-3 md:py-4 px-3 md:px-4 flex items-center justify-between transition-colors`}>
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-md ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
        >
          <HiMenu className="size-6" />
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          <HiMiniBuildingLibrary className="size-5 md:size-6 text-green-400" />
          <h1 className="text-lg md:text-2xl font-semibold">
            <span className="hidden sm:inline">Library System</span>
            <span className="sm:hidden">Library</span>
          </h1>
        </div>
      </div>
     
     <div className="flex justify-end items-center gap-2 md:gap-4 flex-1">
       <div className={`hidden md:flex h-10 p-2 w-full max-w-xs border-2 rounded-full items-center ${theme === "light" ? "border-gray-300" : "border-gray-600"}`}>
        <input
          className={`w-full appearance-none outline-0 text-base p-2 rounded-full h-full bg-transparent ${theme === "light" ? "placeholder-gray-500" : "placeholder-gray-400"}`}
          placeholder="Search"
          type="text"
        />
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:block relative">
          <button
            onClick={() => handleClickSelectActive()}
            className={`border-2 rounded-full px-3 w-fit py-1 text-sm whitespace-nowrap ${theme === "light" ? "border-gray-300" : "border-gray-600"}`}
          >
            {
              period==="Select Period"?period:
              period.slice(1,-1)
            }
        
          </button>
          {selectActive && (
            <ul className={`absolute left-0 mt-2 w-40 border rounded-xl shadow-lg z-50 ${theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-600"}`}>
              <li
                onClick={() => handleClickSetPeriod("6 months")}
                className="px-3 py-2 hover:bg-green-400 hover:text-white cursor-pointer rounded-t-xl"
              >
                6 months
              </li>
              <li
                onClick={() => handleClickSetPeriod("12 months")}
                className="px-3 py-2 hover:bg-green-400 hover:text-white cursor-pointer"
              >
                12 months
              </li>
              <li
                onClick={() => handleClickSetPeriod("24 months")}
                className="px-3 py-2 hover:bg-green-400 hover:text-white cursor-pointer rounded-b-xl"
              >
                24 months
              </li>
            </ul>
          )}
        </div>

        <div className="hidden sm:block">
          <IoIosNotifications className="size-5 hover:text-green-400 cursor-pointer" />
        </div>
        
        <div>
          <button onClick={toggleTheme} className={`p-1 rounded ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}>
            {theme === 'light' ? <MdDarkMode className="size-5 text-[#6b6b6b]" /> : <MdLightMode className="size-5 text-yellow-400" />}
          </button>
        </div>
        
        <div onClick={()=>setProfilePop(!profilePop)} className="w-8 h-8 md:w-10 md:h-10 p-1 cursor-pointer border-2 rounded-full border-green-400">
          <img
            className="w-full h-full rounded-full"
            src="https://i.pinimg.com/736x/5e/87/00/5e8700424201eb225c9a7dea4c3ec7f4.jpg"
            alt="profile image"
          />
         
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
           <p className="cursor-pointer hover:text-green-400 text-sm">Admin</p>
           <p className="text-green-400 cursor-pointer hover:text-green-300">|</p>
           <p className="hover:text-green-400 cursor-pointer text-sm">Odari</p>
         </div>
         
         <button
           onClick={handleLogout}
           className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${theme === "light" ? "text-gray-600 hover:text-red-600 hover:bg-red-50" : "text-gray-400 hover:text-red-400 hover:bg-red-900/20"}`}
         >
           <FiLogOut className="size-4" />
           <span className="text-sm">Logout</span>
         </button>
         
         <button
           onClick={handleLogout}
           className={`md:hidden p-2 rounded-md transition-colors ${theme === "light" ? "text-gray-600 hover:text-red-600 hover:bg-red-50" : "text-gray-400 hover:text-red-400 hover:bg-red-900/20"}`}
           title="Logout"
         >
           <FiLogOut className="size-5" />
         </button>
      </div>
     </div>
     {
      profilePop &&  <div className='absolute top-19 right-5 z-10'>
            <UserProfile/>
          </div>
     }
    </div>
  );
};

export default Navbar;

