import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import appContext from '../../Contexts/AppContext';
import { borrowRecordsAPI } from "../../Features/Records/borrowRecordsAPI";
import { useGetBooksQuery } from "../../Features/Books/bookAPI";
import { userApi } from "../../Features/Auth/userApi";
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";

const borrowRecordSchema = yup.object({
  user_id: yup.number().required("User ID is required").positive().integer(),
  book_id: yup.number().required("Book ID is required").positive().integer(),
  borrow_date: yup.string().required("Borrow date is required"),
  due_date: yup.string().required("Due date is required"),
  status: yup.string().notRequired(),
});

const BorrowRecordsManagement = ({ embedded = false }: { embedded?: boolean }) => {
  const { theme } = useContext(appContext);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [showClearForm, setShowClearForm] = useState(false);
  const [clearRecordId, setClearRecordId] = useState<number | null>(null);

  // Get borrow records
  const { data: borrowRecords, isLoading, error, refetch } = borrowRecordsAPI.useGetBorrowRecordsQuery();
  const [createBorrowRecord] = borrowRecordsAPI.useCreateBorrowRecordMutation();
  const [updateBorrowRecord] = borrowRecordsAPI.useUpdateBorrowRecordMutation();
  const [clearBorrowRecord] = borrowRecordsAPI.useClearBorrowRecordMutation();
  const [deleteBorrowRecord] = borrowRecordsAPI.useDeleteBorrowRecordMutation();

  // Get books and users for dropdowns
  const { data: books } = useGetBooksQuery();
  const { data: users } = userApi.useGetUserQuery();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(borrowRecordSchema),
    defaultValues: {
      user_id: 0,
      book_id: 0,
      borrow_date: new Date().toISOString().split('T')[0],
      due_date: new Date().toISOString().split('T')[0],
      status: "Borrowed",
    },
  });

  const { control: clearControl, handleSubmit: handleClearSubmit, reset: clearReset } = useForm({
    defaultValues: {
      return_date: new Date().toISOString().split('T')[0],
      status: "Returned",
    },
  });

  useEffect(() => {
    if (editingRecord) {
      reset({
        user_id: editingRecord.user_id,
        book_id: editingRecord.book_id,
        borrow_date: editingRecord.borrow_date.split('T')[0],
        due_date: editingRecord.due_date.split('T')[0],
        status: editingRecord.status || "Borrowed",
      });
    }
  }, [editingRecord, reset]);

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleClear = (borrow_id: number) => {
    setClearRecordId(borrow_id);
    setShowClearForm(true);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingRecord) {
        const updatedRecord = {
          borrow_id: editingRecord.borrow_id,
          ...data,
        };

        await updateBorrowRecord(updatedRecord).unwrap();
        toast.success("Borrow record updated successfully");
      } else {
        const newRecord = {
          user_id: data.user_id,
          book_id: data.book_id,
          borrow_date: data.borrow_date,
          due_date: data.due_date,
          status: data.status || "Borrowed",
        };

        await createBorrowRecord(newRecord).unwrap();
        toast.success("Borrow record created successfully");
      }
      resetForm();
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving borrow record");
    }
  };

  const onClearSubmit = async (data: any) => {
    try {
      if (!clearRecordId) return;

      const clearData = {
        borrow_id: clearRecordId,
        return_date: data.return_date,
        status: data.status || "Returned",
      };

      await clearBorrowRecord(clearData).unwrap();
      toast.success("Borrow record cleared successfully");
      setShowClearForm(false);
      setClearRecordId(null);
      clearReset();
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while clearing borrow record");
    }
  };

  const resetForm = () => {
    reset();
    setEditingRecord(null);
    setShowForm(false);
  };

  const handleDelete = async (borrow_id: number) => {
    if (confirm("Are you sure you want to delete this borrow record?")) {
      try {
        await deleteBorrowRecord(borrow_id).unwrap();
        toast.success("Borrow record deleted successfully");
        refetch();
      } catch (err) {
        console.error(err);
        toast.error("Error occurred while deleting borrow record");
      }
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

  return (
    <div className="w-full flex flex-col gap-5">
      {!embedded && <ToastContainer />}

      <div className="w-full flex justify-between items-center">
        <h2 className={`text-2xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Borrow Records Management</h2>
        <button
          onClick={() => { reset(); setEditingRecord(null); setShowForm(true); }}
          className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Add Borrow Record
        </button>
      </div>

      {showForm && (
        <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            {editingRecord ? "Edit Borrow Record" : "Add New Borrow Record"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  User
                </label>
                {errors.user_id && <p className="text-red-500 text-xs">{errors.user_id.message}</p>}
                <Controller
                  name="user_id"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="">Select User</option>
                      {users?.map((user: any) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Book
                </label>
                {errors.book_id && <p className="text-red-500 text-xs">{errors.book_id.message}</p>}
                <Controller
                  name="book_id"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value || ""}
                      onChange={field.onChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="">Select Book</option>
                      {books?.map((book: any) => (
                        <option key={book.book_id} value={book.book_id}>
                          {book.title} by {book.author}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  Borrow Date
                </label>
                {errors.borrow_date && <p className="text-red-500 text-xs">{errors.borrow_date.message}</p>}
                <Controller
                  name="borrow_date"
                  control={control}
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
                  Due Date
                </label>
                {errors.due_date && <p className="text-red-500 text-xs">{errors.due_date.message}</p>}
                <Controller
                  name="due_date"
                  control={control}
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
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value || "Borrowed"}
                      onChange={field.onChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                    >
                      <option value="Borrowed">Borrowed</option>
                      <option value="Returned">Returned</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                {editingRecord ? "Update" : "Add"} Borrow Record
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showClearForm && (
        <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
            Clear Borrow Record
          </h3>
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
                      <option value="Overdue">Overdue</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                Clear Record
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
          <h3 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Borrow Records List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                <th className="px-4 py-2 text-left">User</th>
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
                  <td colSpan={6} className="text-center py-4">
                    <ScaleLoader color="#4ea872" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-red-500">
                    Error loading borrow records
                  </td>
                </tr>
              ) : borrowRecords && borrowRecords.length > 0 ? (
                borrowRecords.map((record: any) => {
                  // Find user and book names
                  const user = users?.find((u: any) => u.user_id === record.user_id);
                  const book = books?.find((b: any) => b.book_id === record.book_id);

                  return (
                    <tr key={record.borrow_id} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {user ? `${user.username} (${user.email})` : `User ${record.user_id}`}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {book ? `${book.title} by ${book.author}` : `Book ${record.book_id}`}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {new Date(record.borrow_date).toLocaleDateString()}
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        {new Date(record.due_date).toLocaleDateString()}
                      </td>
                      <td className={`px-4 py-2`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status || "")}`}>
                          {record.status || "Unknown"}
                        </span>
                      </td>
                      <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleEdit(record)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          {record.status !== "Returned" && (
                            <button
                              onClick={() => handleClear(record.borrow_id)}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              Clear
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(record.borrow_id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No borrow records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowRecordsManagement;