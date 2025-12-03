import { MdDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import { VscRecordSmall } from "react-icons/vsc";
import { IoHelp, IoClose } from "react-icons/io5";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import appContext from "../../Contexts/AppContext";
import { useContext } from "react";

const listData = [
  { name: "Dashboard", icon: <MdDashboard className="size-5" /> },
  { name: "Books", icon: <FaBook className="size-5" /> },
  { name: "Admin", icon: <RiAdminFill className="size-5" /> },
  { name: "Users", icon: <FaUsers className="size-5" /> },
  { name: "Notifications", icon: <IoIosNotifications className="size-5" /> },
  { name: "Records", icon: <VscRecordSmall className="size-5" /> },
  { name: "Settings", icon: <IoIosSettings className="size-5" /> },
  { name: "Help", icon: <IoHelp className="size-5" /> },
];

const Sidebar = () => {
  const {
    collapse,
    setCollapse,
    setSideActive,
    theme,
    setSelectActive,
    sideActive,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useContext(appContext);

  const handleClick = (index: number) => {
    localStorage.setItem("sideActive", JSON.stringify(index));
    setCollapse(true);
    setSideActive(index);
    setSelectActive(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <div
        className={`${
          collapse ? "w-20" : "w-64 lg:w-1/6"
        } ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          theme === "light"
            ? "bg-white text-gray-700"
            : "bg-gray-900 text-[#6b6b6b]"
        }  fixed lg:relative h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] justify-between shadow px-3 py-4 flex flex-col gap-5 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Top Section */}
        <div className="w-full flex flex-col gap-5 relative">
          <div className="w-full px-4 flex items-center gap-1 justify-between">
            {/* Close button on mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`lg:hidden p-1 rounded ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
            >
              <IoClose className={`size-6 ${theme === "light" ? "text-[#313131]" : "text-gray-400"}`} />
            </button>

            <div className="lg:absolute lg:right-0">
              {collapse ? (
                <TbLayoutSidebarRightCollapseFilled
                  onClick={() => setCollapse(false)}
                  className={`size-6 cursor-pointer ${theme === "light" ? "text-[#313131]" : "text-gray-400"}`}
                />
              ) : (
                <TbLayoutSidebarLeftCollapseFilled
                  onClick={() => setCollapse(true)}
                  className={`size-6 cursor-pointer ${theme === "light" ? "text-[#313131]" : "text-gray-400"}`}
                />
              )}
            </div>
          </div>

          <div className="w-full">
            <ul className="w-full flex flex-col gap-1">
              {listData.slice(0, listData.length - 2).map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`${
                    sideActive === index
                      ? "bg-green-400 text-white"
                      : theme === "light" 
                      ? "text-gray-700" 
                      : "text-gray-400"
                  } flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
                >
                  {item.icon} {!collapse && item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full pb-5">
          <ul className="w-full flex flex-col gap-1">
            {listData
              .slice(listData.length - 2)
              .map((item, index) => {
                const realIndex = index + (listData.length - 2)

                return (
                  <li
                    key={realIndex}
                    onClick={() => handleClick(realIndex)}
                    className={`${
                      sideActive === realIndex
                        ? "bg-green-400 text-white"
                        : theme === "light" 
                        ? "text-gray-700" 
                        : "text-gray-400"
                    } flex items-center w-full gap-4 px-4 py-1 cursor-pointer rounded-xs hover:text-white hover:bg-green-400`}
                  >
                    {item.icon} {!collapse && item.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
