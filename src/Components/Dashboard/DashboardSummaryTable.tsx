import SimpleTable from '../Tables/Table'
import { LuListFilter } from "react-icons/lu";
import { useContext } from "react";
import appContext from "../../Contexts/AppContext";

const DashboardSummaryTable = () => {
  const { theme } = useContext(appContext);
  
  return (
     <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-5">
      <div className={`flex-1 overflow-y-auto px-3 py-2 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className='w-full h-16 flex items-center justify-between mb-2'>
            <p className={theme === "light" ? "text-gray-900" : "text-gray-100"}>OverDue History</p>
            <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"}/>
        </div>
         <div className='w-full'>
           <SimpleTable />
         </div>
      </div>
        <div className={`flex-1 overflow-y-auto px-3 py-2 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className='w-full h-16 flex items-center justify-between mb-2'>
            <p className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Lost Books</p>
            <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"}/>
        </div>
          <div className='w-full'>
           <SimpleTable />
         </div>
      </div>
      </div>
  )
}

export default DashboardSummaryTable;
