import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import appContext from "../Contexts/AppContext";
import { HiMiniBuildingLibrary } from "react-icons/hi2";

const Navbar = () => {
  const { selectActive, setSelectActive, period, setPeriod } =
    useContext(appContext);
  const handleClickSelectActive = () => {
    setSelectActive(true);
  };
  const handleClickSetPeriod = (period: string) => {
    localStorage.setItem("Period", period);
    setPeriod(JSON.stringify(localStorage.getItem("Period")));
    setSelectActive(false);
  };
  console.log(period);
  return (
    <div className="w-full shadow-md shadow-green-100 bg-white h-15 4 py-4 px-3 flex items-center justify-between">
      <div className=" px-4 lg:w-1/6 flex items-center gap-1">
                <HiMiniBuildingLibrary className="size-6 text-green-400" />
                <h1 className="text-2xl font-semibold text-[#313131]">
                  Library System
                </h1>
      </div>
     <div className="lg:w-5/6 flex justify-between items-center ">
       <div className="h-10 p-2 w-1/5 flex border-gray-300 border-2 rounded-full items-center justify-center">
        <input
          className="w-full appearance-none outline-0 text-base p-2 rounded-full  h-full"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex items-center  gap-4">
        <div className="relative inline-block">
          <button
            onClick={() => handleClickSelectActive()}
            className="border-2 border-gray-300 rounded-full px-3 py-1"
          >
            {period.slice(1, -1)}
          </button>
          {selectActive && (
            <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-xl shadow">
              <li
                onClick={() => handleClickSetPeriod("6 months")}
                className="px-3 py-1 hover:bg-green-400 hover:text-white  cursor-pointer rounded-t-xl"
              >
                6 months
              </li>
              <li
                onClick={() => handleClickSetPeriod("12 months")}
                className="px-3 py-1 hover:bg-green-400 hover:text-white cursor-pointer"
              >
                12 months
              </li>
              <li
                onClick={() => handleClickSetPeriod("24 months")}
                className="px-3 py-1 hover:bg-green-400 hover:text-white cursor-pointer rounded-b-xl"
              >
                24 months
              </li>
            </ul>
          )}
        </div>

        <div>
          <IoIosNotifications className="size-5 hover:text-green-400 cursor-pointer text-[#6b6b6b]" />
        </div>
        <div className="w-10 h-10 p-1 cursor-pointer border-2 rounded-full border-green-400">
          <img
            className="w-full  h-full rounded-full"
            src="https://i.pinimg.com/736x/5e/87/00/5e8700424201eb225c9a7dea4c3ec7f4.jpg"
            alt="profile image"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="cursor-pointer hover:text-green-400">Admin</p>
          <p className="text-green-400 cursor-pointer hover:text-black">|</p>
          <p className="hover:text-green-400 cursor-pointer">Odari</p>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Navbar;
