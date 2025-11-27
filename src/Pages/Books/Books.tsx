import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import appContext from "../../Contexts/AppContext";
import type { Book, BookInput, BookUpdateInput } from "../../Types/books.Interface";
import { bookAPI } from "../../Features/Books/bookAPI";
import ScaleLoader from "react-spinners/ScaleLoader";
import {toast,ToastContainer} from 'react-toastify'
import Alert from "../../Components/Alert/Alert"

const bookSchema: yup.ObjectSchema<BookInput> = yup.object({
  title: yup.string().required(),
  author: yup.string().required(),
  category_id: yup.number().nullable().notRequired(),
  publication_year: yup.number().integer().min(1000).max(9999).nullable().notRequired(),
  stock_quantity: yup.number().required().min(0),
}).required();

const Books = ({ embedded = false, initialBooks = [] }: { embedded?: boolean, initialBooks?: Book[] }) => {

  const { theme,alertPop,setAlertPop,deletedBook,setDeleteBook,deleteApprove } = useContext(appContext);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null); 
  const { data, isLoading, error } = bookAPI.useGetBooksQuery();
  const [createBook] = bookAPI.useCreateBookMutation()
  const [updateBook] = bookAPI.useUpdateBookMutation() 
  const [deleteBook] = bookAPI.useDeleteBookMutation()
  const { control, handleSubmit, reset, formState: { errors } } = useForm<BookInput | BookUpdateInput>({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      category_id: undefined,
      publication_year: undefined,
      stock_quantity: 0,
    },
  });
    
    const handleEdit = (book: Book) => {
      const { book_id, created_at, updated_at, ...values } = book;
      reset(values);
      setEditingBook(book);
      setShowForm(true);
    };

  const onSubmit: SubmitHandler<BookInput | BookUpdateInput> = async (data) => {
    if (editingBook !== null) {
        const updatedBookData: BookUpdateInput = {
        title: data.title,
        author: data.author,
        category_id: data.category_id ?? null,
        publication_year: data.publication_year ?? null,
        stock_quantity: data.stock_quantity,
      };
    
      if (books.length > 0) {
        setBooks(prev => prev.map(b => b.book_id === editingBook.book_id ? { ...b, ...updatedBookData, updated_at: new Date() } : b));
      }
      const res=await updateBook({
        id:editingBook.book_id,
        data:updatedBookData
      })
      console.log(res)
      if(res){
        toast.success(`Book with Updated Successfully.`)
      }
    } else {
      const newBook: BookInput = {
        title: data.title!,
        author: data.author!,
        category_id: data.category_id ?? null,
        publication_year: data.publication_year ?? null,
        stock_quantity: data.stock_quantity!,
      };
      const res = await createBook(newBook).unwrap()
       if(res){
        toast.success(`Book Added Successfully.`)
      }
    }
    resetForm();
  };

  console.log(books)
  const resetForm = () => {
    reset();
    setEditingBook(null);
    setShowForm(false);
  };


  const handleDelete = (index: number) => {
    if(deleteApprove) {
      deleteBook(index)
     toast.success("Book Deleted Successfully")
    } 
    else{
      toast.error("Reverted Deleted Process")
    }
    
  };

  const fields: (keyof BookInput)[] = ["title", "author", "category_id", "publication_year", "stock_quantity"];

  return (
    <div className={`w-full relative flex flex-col items-center h-full gap-1 overflow-hidden`}>
      {alertPop && (
        <div className="absolute top-[30%] z-20">
          <Alert/>
        </div>
      )}
      <ToastContainer/>
      {!embedded && <Navbar />}
      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}
        <div className="w-full p-8 flex flex-col gap-5 overflow-y-auto overflow-x-hidden">

          <div className="w-full flex justify-between items-center">
            <h1 className={`text-3xl font-semibold ${theme === "light" ? "text-[#313131]" : "text-gray-100"}`}>Books Management</h1>
            <button
              disabled={isLoading}
              onClick={() => { reset(); setEditingBook(null); setShowForm(true); }} 
              className={` ${isLoading ? "disable" : ""} bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500`}
            >
              Add Book
            </button>
          </div>

          {showForm && (
            <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                {editingBook !== null ? "Edit Book" : "Add New Book"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {fields.map(name => (
                    <div key={name}>
                      <label className={`block text-sm font-medium mb-2 capitalize ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        {name.replace("_", " ")}
                      </label>
                      <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <input
                            type={name === "stock_quantity" || name === "category_id" || name === "publication_year" ? "number" : "text"}
                            value={field.value ?? ""}
                            onChange={e => field.onChange(
                              e.target.value === "" ? undefined :
                                name === "stock_quantity" ? Number(e.target.value) :
                                  name === "category_id" || name === "publication_year" ? Number(e.target.value) : e.target.value
                            )}
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-400 ${theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-600 bg-gray-700 text-gray-100"}`}
                            onWheel={e => e.currentTarget.blur()}
                          />
                        )}
                      />
                      {errors[name] && <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                    {editingBook !== null ? "Update" : "Add"} Book
                  </button>
                  <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={`w-full p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Books List</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={theme === "light" ? "bg-gray-50" : "bg-gray-700"}>
                    {["Title", "Author", "Category ID", "Publication Year", "Quantity", "Availability", "Actions"].map(header => (
                      <th key={header} className={`px-4 py-2 text-left ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {
                    error ? <h1>Error Fetching Books Data</h1> : (
                      isLoading ? (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            <ScaleLoader color="#4ea872" />
                          </td>
                        </tr>
                      ) : (
                        data?.map((book) => {
                          const available = book.stock_quantity > 0;
                          return (
                            <tr key={book.book_id} onClick={()=>console.log(book.book_id)} className={theme === "light" ? "border-t" : "border-t border-gray-700"}>
                              <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {book.title}
                              </td>
                              <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {book.author}
                              </td>
                              <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {book.category_id ?? "—"}
                              </td>
                              <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {book.publication_year ?? "—"}
                              </td>
                              <td className={`px-4 py-2 ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                                {book.stock_quantity}
                              </td>

                              <td className="px-4 py-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${available
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                    }`}
                                >
                                  {available ? "Available" : "Out of Stock"}
                                </span>
                              </td>

                              <td className="px-4 py-2">
                                <button
                                  onClick={() => handleEdit(book)}
                                  className="text-blue-600 hover:text-blue-800 mr-2"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={()=>{setAlertPop(true);setDeleteBook([book]);handleDelete(book.book_id)}}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Books;