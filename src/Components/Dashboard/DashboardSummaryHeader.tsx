import { ImBooks } from "react-icons/im";
import { IoBookOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import { TbCalendarDue } from "react-icons/tb";
import { PiBookBookmarkBold } from "react-icons/pi";
import { MdLibraryAdd } from "react-icons/md";
import { useContext } from "react";
import appContext from "../../Contexts/AppContext";
import { useGetBooksQuery } from "../../Features/Books/bookAPI";

const DashboardSummaryHeader = () => {
  const { theme,profileInfo } = useContext(appContext);
  const { data: books, isLoading } = useGetBooksQuery();
  const totalBooks = books?.length || 0;
  const availableBooks = books?.filter(book => book.stock_quantity > 0).length || 0;
  const borrowedBooks = totalBooks - availableBooks;
  const overdueBooks = 0;
  const lostBooks = 0; 
  const newArrivals = books?.filter(book => {
    const bookDate = new Date(book.created_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return bookDate > threeMonthsAgo;
  }).length || 0;

  const summaryData = [
    {
      label: "Total Books",
      value: totalBooks.toString(),
      change: isLoading ? "..." : (totalBooks > 0 ? "+" + Math.round((availableBooks / totalBooks) * 100) + "%" : "0%"),
      icon: <ImBooks className="size-6 text-green-500" />,
      bg: "bg-green-100",
      bgDark: "bg-green-900/30",
      border: "border-green-400",
    },
    {
      label: "Borrowed Books",
      value: borrowedBooks.toString(),
      change: isLoading ? "..." : (borrowedBooks > 0 ? "+" + Math.round((borrowedBooks / totalBooks) * 100) + "%" : "0%"),
      icon: <IoBookOutline className="size-6 text-purple-500" />,
      bg: "bg-purple-100",
      bgDark: "bg-purple-900/30",
      border: "border-purple-400",
    },
    {
      label: "Available Books",
      value: availableBooks.toString(),
      change: isLoading ? "..." : (availableBooks > 0 ? "+" + Math.round((availableBooks / totalBooks) * 100) + "%" : "0%"),
      icon: <LuBookOpen className="size-6 text-blue-500" />,
      bg: "bg-blue-100",
      bgDark: "bg-blue-900/30",
      border: "border-blue-400",
    },
    {
      label: "Overdue Books",
      value: overdueBooks.toString(),
      change: "-2%",
      icon: <TbCalendarDue className="size-6 text-orange-500" />,
      bg: "bg-orange-100",
      bgDark: "bg-orange-900/30",
      border: "border-orange-400",
    },
    {
      label: "Lost Books",
      value: lostBooks.toString(),
      change: "+1%",
      icon: <PiBookBookmarkBold className="size-6 text-red-500" />,
      bg: "bg-red-100",
      bgDark: "bg-red-900/30",
      border: "border-red-400",
    },
    {
      label: "New Arrivals",
      value: newArrivals.toString(),
      change: isLoading ? "..." : (newArrivals > 0 ? "+" + Math.round((newArrivals / totalBooks) * 100) + "%" : "0%"),
      icon: <MdLibraryAdd className="size-6 text-yellow-500" />,
      bg: "bg-yellow-100",
      bgDark: "bg-yellow-900/30",
      border: "border-yellow-400",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center lg:justify-between flex-wrap gap-3 md:gap-5">
      {
        profileInfo[0].role=="admin"?
        <>
      {summaryData.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-md transition duration-500 w-full sm:w-[calc(50%-0.75rem)]
          md:w-[calc(33.333%-1rem)] lg:w-[200px] hover:scale-105 cursor-pointer h-30
          flex items-start p-3 gap-2 justify-center flex-col border-b-4 ${item.border} ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
        >
          <div className="w-full flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === "light" ? item.bg : item.bgDark}`}>{item.icon}</div>
            <p className={`text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{item.label}</p>
          </div>

          <p className={`text-xl font-semibold p-1 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            {item.value}{" "}
            <span
              className={`text-sm rounded-full px-2 ${
                item.change.startsWith("-")
                  ? "bg-red-200 text-red-500"
                  : "bg-green-200 text-green-600"
              }`}
            >
              {item.change}
            </span>
          </p>
        </div>
      ))}
        </>:
        <>
        {summaryData.filter(item=>(item.label!=="Total Books"&&item.label!=="New Arrivals")).map((item, idx) => (
        <div
          key={idx}
          className={`rounded-md transition duration-500 w-full sm:w-[calc(50%-0.75rem)]
          md:w-[calc(33.333%-1rem)] lg:w-[200px] hover:scale-105 cursor-pointer h-30
          flex items-start p-3 gap-2 justify-center flex-col border-b-4 ${item.border} ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
        >
          <div className="w-full flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === "light" ? item.bg : item.bgDark}`}>{item.icon}</div>
            <p className={`text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{item.label}</p>
          </div>

          <p className={`text-xl font-semibold p-1 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            {item.value}{" "}
            <span
              className={`text-sm rounded-full px-2 ${
                item.change.startsWith("-")
                  ? "bg-red-200 text-red-500"
                  : "bg-green-200 text-green-600"
              }`}
            >
              {item.change}
            </span>
          </p>
        </div>
      ))}
        </>

      }
    </div>
  );
};

export default DashboardSummaryHeader;
