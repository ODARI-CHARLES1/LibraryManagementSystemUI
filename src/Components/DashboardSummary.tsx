import { SiWikibooks } from "react-icons/si";
import BasicPie from "./PieChart";
import BiaxialLineChart from './LineChart'
const DashboardSummary = () => {
  return (
    <div className="w-full flex overflow-y-auto overflow-x-hidden items-center flex-col flex-wrap gap-5 p-8">
      <div className="w-full h-1/5 flex items-center justify-between flex-wrap gap-5" >
        <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-green-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-green-100 rounded-full"><SiWikibooks  className="size-6 text-green-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
         <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-purple-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-purple-100 rounded-full"><SiWikibooks  className="size-6 text-purple-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
         <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-green-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-green-100 rounded-full"><SiWikibooks  className="size-6 text-green-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
         <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-orange-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-orange-100 rounded-full"><SiWikibooks  className="size-6 text-orange-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
         <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-green-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-green-100 rounded-full"><SiWikibooks  className="size-6 text-green-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
         <div className="bg-white rounded-md w-[200px] h-30 flex items-start p-3 gap-2 justify-center flex-col border-b-4 border-green-400">
          <div className="w-full flex items-center gap-3">
            <p className="p-2 bg-green-100 rounded-full"><SiWikibooks  className="size-6 text-green-400"/></p>
            <p className="text-base text-gray-600 ">Borrowed Books</p></div>
            <p className="text-xl font-semibold p-1">2405 <span className="text-sm bg-green-200 text-green-500 rounded-full">+4%</span></p>
        </div>
        
      </div>
      <div className="w-full flex flex-wrap gap-5 items-center h-2/5">
        <div className="flex h-full items-start flex-col gap-2  p-5 rounded-md bg-white ">
          <div>
          <p className="text-gray-600 text-xl">Books Circulation</p>
          </div>
          <BasicPie/>
        </div>
        <div className="w-full h-full p-5 item-start flex flex-col gap-2  bg-white rounded-md">
          <div>
            <p className="text-gray-600 text-xl">Books History</p>
          </div>
          <BiaxialLineChart/>
        </div>
      </div>
      <div className="h-2/5"></div>
    </div>
  )
}

export default DashboardSummary
