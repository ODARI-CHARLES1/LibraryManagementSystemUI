import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { VscRecordSmall } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { IoHelp } from "react-icons/io5";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import appContext from "../Contexts/AppContext";
import { useContext } from "react";


const Sidebar = () => {
  const {collapse,setCollapse}=useContext(appContext)
  return (
    <div
      className={`${
        collapse ? "w-20" : "lg:w-1/6 w-2/6"
      } h-screen  bg-white shadow px-1  py-4 flex flex-col justify-between gap-5`}
    >
      <div className="w-full flex flex-col gap-5 relative">
        <div className="w-full px-4 flex items-center gap-1">
          <HiMiniBuildingLibrary className="size-6 text-[#73BC75]" />
          <h1 className="text-2xl font-semibold text-[#313131]">
            {collapse ? "" : "Library System"}
          </h1>
          <div className="absolute  right-0">
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
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <MdDashboard className="size-5" /> {collapse ? "" : "Dashboard"}
            </li>
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <MdLibraryBooks className="size-5" /> {collapse ? "" : "Books"}
            </li>
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <RiAdminFill className="size-5" />
              {collapse ? "" : "Admins"}
            </li>
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <FaUsers className="size-5" />
              {collapse ? "" : "Users"}
            </li>
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <IoIosNotifications className="size-5" />
              {collapse ? "" : "Notifications"}
            </li>
            <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
              {" "}
              <VscRecordSmall className="size-5" /> {collapse ? "" : "Records"}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full pb-5">
        <ul>
          <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
            {" "}
            <IoIosSettings className="size-5" />
            {collapse ? "" : "Settings"}
          </li>
          <li className="flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-[#73BC75]">
            {" "}
            <IoHelp className="size-5" />
            {collapse ? "" : "Help"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
