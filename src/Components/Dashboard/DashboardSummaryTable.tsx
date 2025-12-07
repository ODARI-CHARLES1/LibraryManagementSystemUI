import { useContext } from "react";
import appContext from "../../Contexts/AppContext";
import { borrowRecordsAPI } from "../../Features/Records/borrowRecordsAPI";
import { useGetBooksQuery } from "../../Features/Books/bookAPI";
import { userApi } from "../../Features/Auth/userApi";
import ScaleLoader from "react-spinners/ScaleLoader";
import { LuListFilter } from "react-icons/lu";

const DashboardSummaryTable = () => {
  const { theme } = useContext(appContext);

  // Get borrow records data
  const { data: borrowRecords, isLoading: isBorrowLoading } = borrowRecordsAPI.useGetBorrowRecordsQuery();
  const { data: books } = useGetBooksQuery();
  const { data: users } = userApi.useGetUserQuery();

  // Filter overdue records (due_date passed and status is not Returned)
  const getOverdueRecords = () => {
    if (!borrowRecords) return [];

    const currentDate = new Date();
    return borrowRecords.filter((record: any) => {
      const dueDate = new Date(record.due_date);
      return dueDate < currentDate && record.status !== "Returned";
    });
  };

  // Filter lost books (could be based on status or other criteria)
  const getLostBooks = () => {
    if (!borrowRecords) return [];

    return borrowRecords.filter((record: any) =>
      record.status === "Lost" ||
      (record.status !== "Returned" && isBookOverdueByWeeks(record, 4)
    ));
  };

  // Helper function to check if book is overdue by certain weeks
  const isBookOverdueByWeeks = (record: any, weeks: number) => {
    const currentDate = new Date();
    const dueDate = new Date(record.due_date);
    const diffTime = Math.abs(currentDate.getTime() - dueDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks >= weeks;
  };

  // Get user and book names for display
  const getUserName = (userId: number) => {
    const user = users?.find((u: any) => u.user_id === userId);
    return user ? `${user.username} (${user.email})` : `User ${userId}`;
  };

  const getBookTitle = (bookId: number) => {
    const book = books?.find((b: any) => b.book_id === bookId);
    return book ? `${book.title} by ${book.author}` : `Book ${bookId}`;
  };

  const overdueRecords = getOverdueRecords();
  const lostBooks = getLostBooks();

  return (
    <div className="w-full flex items-center justify-between flex-col lg:flex-row gap-5">
      {/* Overdue Books Section */}
      <div className={`flex-1 overflow-y-auto px-3 py-2 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className='w-full h-16 flex items-center justify-between mb-2'>
            <p className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Overdue Books</p>
            <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"}/>
        </div>
        <div className='w-full'>
          {isBorrowLoading ? (
            <div className="text-center py-4">
              <ScaleLoader color="#4ea872" />
            </div>
          ) : overdueRecords.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Book</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {overdueRecords.map((record: any) => {
                  const dueDate = new Date(record.due_date);
                  const currentDate = new Date();
                  const daysOverdue = Math.ceil((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

                  return (
                    <tr key={record.borrow_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {getUserName(record.user_id)}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {getBookTitle(record.book_id)}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {dueDate.toLocaleDateString()}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {daysOverdue} days
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-green-600">No overdue books</p>
          )}
        </div>
      </div>

      {/* Lost Books Section */}
      <div className={`flex-1 overflow-y-auto px-3 py-2 rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className='w-full h-16 flex items-center justify-between mb-2'>
            <p className={theme === "light" ? "text-gray-900" : "text-gray-100"}>Lost Books</p>
            <LuListFilter className={theme === "light" ? "text-gray-700" : "text-gray-300"}/>
        </div>
        <div className='w-full'>
          {isBorrowLoading ? (
            <div className="text-center py-4">
              <ScaleLoader color="#4ea872" />
            </div>
          ) : lostBooks.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Book</th>
                  <th className="px-4 py-2 text-left">Borrow Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {lostBooks.map((record: any) => (
                  <tr key={record.borrow_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {getUserName(record.user_id)}
                    </td>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {getBookTitle(record.book_id)}
                    </td>
                    <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                      {new Date(record.borrow_date).toLocaleDateString()}
                    </td>
                    <td className={`px-4 py-2`}>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {record.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-green-600">No lost books reported</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryTable;
