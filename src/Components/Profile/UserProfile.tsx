import { MdModeEditOutline } from "react-icons/md";
import { useContext } from "react";
import appContext from "../../Contexts/AppContext";

const UserProfile = () => {
  const { theme } = useContext(appContext);
  
  return (
    <div className={`w-[320px] relative h-fit cursor-pointer p-4 shadow-md rounded-lg flex items-center gap-4 hover:shadow-lg transition-shadow ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      
      <div className="shrink-0">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src="https://i.pinimg.com/736x/5e/87/00/5e8700424201eb225c9a7dea4c3ec7f4.jpg"
          alt="user profile image"
        />
      </div>

      <div className={`w-px self-stretch ${theme === "light" ? "bg-gray-200" : "bg-gray-600"}`}></div>

      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold text-green-600 leading-tight">
          Odari K. Charles
        </h1>

        <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>Admin • Librarian</p>

        <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Odari.charlesk@gmail.com</p>
      </div>
      <MdModeEditOutline className={`size-4 absolute top-4 right-4 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`} />
    </div>
  );
};

export default UserProfile;
 