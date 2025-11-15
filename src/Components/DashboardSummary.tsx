
import DashboardSummaryHeader from "./DashboardSummaryHeader";
import DashboardSummaryTable from "./DashboardSummaryTable";
import DashboardVisualise from "./DashboardVisualise";
const DashboardSummary = () => {
  return (
    <div className="w-full flex overflow-y-auto overflow-x-hidden items-center flex-col gap-3 md:gap-5 p-3 md:p-6 lg:p-8">
      <DashboardSummaryHeader/>
      <DashboardVisualise/>
      <DashboardSummaryTable/>
    </div>
  )
}

export default DashboardSummary
