import BasicPie from "../Charts/PieChart";
import BiaxialLineChart from '../Charts/LineChart'
import { useContext } from "react";
import appContext from "../../Contexts/AppContext";

const DashboardVisualise = () => {
  const { theme } = useContext(appContext);
  
  return (
     <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-5 items-stretch">
            <div className={`flex w-full lg:w-auto items-start flex-col gap-2 p-3 md:p-5 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <div>
              <p className={`text-lg md:text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Books Circulation</p>
              </div>
              <BasicPie/>
            </div>
            <div className={`w-full lg:flex-1 p-3 md:p-5 flex flex-col gap-2 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <div>
                <p className={`text-lg md:text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Books History</p>
              </div>
              <BiaxialLineChart/>
            </div>
          </div>
  )
}

export default DashboardVisualise
