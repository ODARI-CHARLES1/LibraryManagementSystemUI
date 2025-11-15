import BasicPie from "../Charts/PieChart";
import BiaxialLineChart from '../Charts/LineChart'
const DashboardVisualise = () => {
  return (
     <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-5 items-stretch">
            <div className="flex w-full lg:w-auto items-start flex-col gap-2 p-3 md:p-5 rounded-md bg-white">
              <div>
              <p className="text-gray-600 text-lg md:text-xl">Books Circulation</p>
              </div>
              <BasicPie/>
            </div>
            <div className="w-full lg:flex-1 p-3 md:p-5 flex flex-col gap-2 bg-white rounded-md">
              <div>
                <p className="text-gray-600 text-lg md:text-xl">Books History</p>
              </div>
              <BiaxialLineChart/>
            </div>
          </div>
  )
}

export default DashboardVisualise
