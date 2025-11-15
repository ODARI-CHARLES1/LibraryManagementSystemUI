import { MdModeEditOutline } from "react-icons/md";
const UserProfile = () => {
  return (
    <div className="w-[320px] relative h-fit cursor-pointer p-4 shadow-md rounded-lg bg-white flex items-center gap-4 hover:shadow-lg transition-shadow">
      
      <div className="shrink-0">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src="https://i.pinimg.com/736x/5e/87/00/5e8700424201eb225c9a7dea4c3ec7f4.jpg"
          alt="user profile image"
        />
      </div>

      <div className="w-px self-stretch bg-gray-200"></div>

      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold text-green-600 leading-tight">
          Odari K. Charles
        </h1>

        <p className="text-gray-500 text-sm">Admin • Librarian</p>

        <p className="text-gray-700 text-sm mt-1">Odari.charlesk@gmail.com</p>
      </div>
      <MdModeEditOutline className='size-4 text-gray-500 absolute top-4 right-4' />
    </div>
  );
};

export default UserProfile;
 