import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { VscRecordSmall } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { IoHelp } from "react-icons/io5";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import appContext from "../Contexts/AppContext";
import { useContext } from "react";

const Sidebar = () => {
  const { collapse, setCollapse, setSideActive,setSelectActive, sideActive } =
    useContext(appContext);
  const handleClick = (index: number) => {
    localStorage.setItem("sideActive", JSON.stringify(index));
    setCollapse(false);
    setSideActive(Number(localStorage.getItem("sideActive")));
    setSelectActive(false)
  };

  return (
    <div
      className={`${
        collapse ? "w-20" : "lg:w-1/6 w-2/6"
      } h-full  bg-white shadow px-3  py-4 flex flex-col justify-between gap-5`}
    >
      <div className="w-full flex flex-col gap-5 relative">
        <div className="w-full px-4 flex items-center text-gray-700 gap-1">
    
          <div className="absolute right-0">
            {collapse ? (
              <TbLayoutSidebarRightCollapseFilled
                onClick={() => setCollapse(false)}
                className="size-6 cursor-pointer text-[#313131]"
              />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled
                onClick={() => setCollapse(true)}
                className="size-6 cursor-pointer text-[#313131]"
              />
            )}
          </div>
        </div>

        <div className="w-full">
          <ul className="w-full flex items-start justify-between flex-col gap-1">
            <li
              onClick={() => handleClick(0)}
              className={`${
                sideActive == 0 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <MdDashboard  className="size-5 " /> {collapse ? "" : "Dashboard"}
            </li>
            <li
              onClick={() => handleClick(1)}
              className={`${
                sideActive == 1 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <MdLibraryBooks  className="size-5 " /> {collapse ? "" : "Books"}
            </li>
            <li
              onClick={() => handleClick(2)}
              className={`${
                sideActive == 2 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <RiAdminFill  className="size-5 " />
              {collapse ? "" : "Admins"}
            </li>
            <li
              onClick={() => handleClick(3)}
              className={`${
                sideActive == 3 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <FaUsers  className="size-5 " />
              {collapse ? "" : "Users"}
            </li>
            <li
              onClick={() => handleClick(4)}
              className={`${
                sideActive == 4 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <IoIosNotifications  className="size-5 " />
              {collapse ? "" : "Notifications"}
            </li>
            <li
              onClick={() => handleClick(5)}
              className={`${
                sideActive == 5 ? "bg-green-400 text-white" : "bg-white"
              } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
            >
              {" "}
              <VscRecordSmall  className="size-5 " /> {collapse ? "" : "Records"}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full pb-5">
        <ul>
          <li
            onClick={() => handleClick(6)}
            className={`${
              sideActive == 6 ? "bg-green-400 text-white" : "bg-white"
            } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
          >
            {" "}
            <IoIosSettings  className="size-5 " />
            {collapse ? "" : "Settings"}
          </li>
          <li
            onClick={() => handleClick(7)}
            className={`${
              sideActive == 7 ? "bg-green-400 text-white" : "bg-white"
            } flex items-center text-gray-700 w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
          >
            {" "}
            <IoHelp  className="size-5 " />
            {collapse ? "" : "Help"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
