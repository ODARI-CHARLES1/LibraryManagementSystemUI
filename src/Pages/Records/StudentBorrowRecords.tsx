import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import appContext from '../../Contexts/AppContext';
import { borrowRecordsAPI } from "../../Features/Records/borrowRecordsAPI";
import { useGetBooksQuery } from "../../Features/Books/bookAPI";
import type { borrowrecords } from "../../Types/borrowrecords.Interface";
import type { Book } from "../../Types/books.Interface";
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";

const StudentBorrowRecords = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme, profileInfo } = useContext(appContext);
  const [showClearForm, setShowClearForm] = useState(false);
  const [clearRecordId, setClearRecordId] = useState<number | null>(null);

  // Get current user's borrow records only
  const { data: allBorrowRecords, isLoading, error, refetch } = borrowRecordsAPI.useGetBorrowRecordsQuery();
  const [clearBorrowRecord] = borrowRecordsAPI.useClearBorrowRecordMutation();

  // Get books for display
  const { data: books } = useGetBooksQuery();

  const { control: clearControl, handleSubmit: handleClearSubmit, reset: clearReset } = useForm({
    defaultValues: {
      return_date: new Date().toISOString().split('T')[0],
      status: "Returned",
    },
  });

  // Filter records for current student only
  const currentUserId = profileInfo?.[0]?.id;
  const studentBorrowRecords = allBorrowRecords?.filter(
    (record: borrowrecords) => record.user_id === currentUserId
  ) || [];

  const handleClear = (borrow_id: number) => {
    setClearRecordId(borrow_id);
    setShowClearForm(true);
  };

  const onClearSubmit = async (data: { return_date: string, status: string }) => {
    try {
      if (!clearRecordId) return;

      const clearData = {
        borrow_id: clearRecordId,
        return_date: data.return_date,
        status: data.status || "Returned",
      };

      await clearBorrowRecord(clearData).unwrap();
      toast.success("Book returned successfully!");
      setShowClearForm(false);
      setClearRecordId(null);
      clearReset();
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while returning book");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookTitle = (bookId: number) => {
    const book = books?.find((b: Book) => b.book_id === bookId);
    return book ? `${book.title} by ${book.author}` : `Book ${bookId}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-1">
      <ToastContainer />
      {!embedded && <Navbar />}
      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}
        <div className="w-full flex flex-col lg:flex-nowrap flex-wrap gap-5 p-8 overflow-x-hidden overflow-y-auto items-start">
          <div className="w-full flex justify-between items-center">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>My Borrowed Books</h1>
          </div>

          {showClearForm && (
            <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                Return Book
              </h2>
              <form onSubmit={handleClearSubmit(onClearSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Return Date
                    </label>
                    <Controller
                      name="return_date"
                      control={clearControl}
                      render={({ field }) => (
                        <input
                          type="date"
                          value={field.value}
                          onChange={field.onChange}
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Status
                    </label>
                    <Controller
                      name="status"
                      control={clearControl}
                      render={({ field }) => (
                        <select
                          value={field.value || "Returned"}
                          onChange={field.onChange}
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                        >
                          <option value="Returned">Returned</option>
                          <option value="Lost">Lost</option>
                        </select>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                    Confirm Return
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowClearForm(false); setClearRecordId(null); clearReset(); }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="w-full flex items-center justify-between">
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>My Borrowed Books</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                    <th className="px-4 py-2 text-left">Book</th>
                    <th className="px-4 py-2 text-left">Borrow Date</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <ScaleLoader color="#4ea872" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-red-500">
                        Error loading your borrow records
                      </td>
                    </tr>
                  ) : studentBorrowRecords.length > 0 ? (
                    studentBorrowRecords.map((record: borrowrecords) => {
                      const dueDate = new Date(record.due_date);
                      const currentDate = new Date();
                      const isOverdue = currentDate > dueDate && record.status !== "Returned";

                      return (
                        <tr key={record.borrow_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                          <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                            {getBookTitle(record.book_id)}
                          </td>
                          <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                            {new Date(record.borrow_date).toLocaleDateString()}
                          </td>
                          <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                            {dueDate.toLocaleDateString()}
                            {isOverdue && record.status !== "Returned" && (
                              <span className="ml-2 text-red-500 text-xs">Overdue!</span>
                            )}
                          </td>
                          <td className={`px-4 py-2`}>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status || "")}`}>
                              {record.status || "Unknown"}
                            </span>
                          </td>
                          <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                            {record.status !== "Returned" && (
                              <button
                                onClick={() => handleClear(record.borrow_id)}
                                className="text-green-600 hover:text-green-800 text-sm"
                              >
                                Return Book
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        You haven't borrowed any books yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBorrowRecords;