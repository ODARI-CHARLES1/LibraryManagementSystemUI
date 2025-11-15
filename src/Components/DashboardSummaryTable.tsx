import ReactVirtualizedTable from './Table'
import { LuListFilter } from "react-icons/lu";
const DashboardSummaryTable = () => {
  return (
     <div className="h-2/5 w-full  flex items-center justify-between flex-col lg:flex-row gap-5">
      <div className=" h-full lg:flex-1/2 overflow-y-auto bg-white px-3 py-2 rounded-md">
        <div className='w-full h-20 flex items-center justify-between'>
            <p >OverDue History</p>
            <LuListFilter/>
        </div>
         <div className='w-full'>
           <ReactVirtualizedTable />
         </div>
      </div>
        <div className=" h-full lg:flex-1/2 overflow-y-auto bg-white px-3 py-2 rounded-md">
        <div className='w-full h-20 flex items-center justify-between'>
            <p>Lost Books</p>
            <LuListFilter/>
        </div>
          <div className='w-full'>
           <ReactVirtualizedTable />
         </div>
      </div>
      </div>
  )
}

export default DashboardSummaryTable
