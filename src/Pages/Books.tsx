import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';

interface Book {
  bookId: number;
  title: string;
  author: string;
  publication_year: string;
  category: string;
  stock_quantity: number;
  available: boolean;
}

const bookSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publication_year: yup
    .string()
    .matches(/^\d{4}$/, 'Year must be 4 digits')
    .required('Publication year is required'),
  category: yup.string().required('Category is required'),
  stock_quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
  available: yup.boolean().required(),
}).required();

type BookFormInputs = Omit<Book, 'bookId'>;

const Books = ({ embedded = false }: { embedded?: boolean }) => {
  const [books, setBooks] = useState<Book[]>([
    {
      bookId: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publication_year: '1925',
      category: 'Fiction',
      stock_quantity: 5,
      available: true,
    },
    {
      bookId: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publication_year: '1960',
      category: 'Fiction',
      stock_quantity: 3,
      available: true,
    },
    {
      bookId: 3,
      title: '1984',
      author: 'George Orwell',
      publication_year: '1949',
      category: 'Dystopian',
      stock_quantity: 2,
      available: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      publication_year: '',
      category: '',
      stock_quantity: 0,
      available: true,
    },
  });

  const onSubmit = (data: BookFormInputs) => {
    if (editingBook) {
      const updatedBooks = books.map((b) =>
        b.bookId === editingBook.bookId ? { ...b, ...data } : b
      );
      setBooks(updatedBooks);
    } else {
      const newBook: Book = {
        bookId: Date.now(),
        ...data,
      };
      setBooks([...books, newBook]);
    }
    resetForm();
  };

  const resetForm = () => {
    reset();
    setEditingBook(null);
    setShowForm(false);
  };

  const handleEdit = (book: Book) => {
    const { bookId, ...values } = book;
    reset(values);
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    setBooks((prev) => prev.filter((b) => b.bookId !== id));
  };

  const fields: (keyof BookFormInputs)[] = [
    'title',
    'author',
    'publication_year',
    'category',
    'stock_quantity',
  ];

  return (
    <div className="w-full overflow-hidden h-full gap-1 flex flex-col items-center">
      {!embedded && <Navbar />}
      <div className="w-full flex gap-5">
        {!embedded && <Sidebar />}

        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">

          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#313131]">Books Management</h1>
            <button
              onClick={() => {
                reset();
                setEditingBook(null);
                setShowForm(true);
              }}
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Add Book
            </button>
          </div>

          {showForm && (
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {fields.map((name) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {name.replace('_', ' ')}
                      </label>

                      <Controller
                        name={name}
                        control={control}
                        render={({ field }) => {
                          const safeValue =
                            typeof field.value === 'boolean' ? '' : field.value ?? '';
                          return (
                            <input
                              type={name === 'stock_quantity' ? 'number' : 'text'}
                              value={safeValue}
                              onChange={(e) => {
                                if (name === 'stock_quantity') {
                                  field.onChange(Number(e.target.value));
                                } else {
                                  field.onChange(e.target.value);
                                }
                              }}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                              onWheel={(e) => e.currentTarget.blur()}
                            />
                          );
                        }}
                      />

                      {errors[name] && (
                        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center mt-4">
                    <Controller
                      name="available"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="mr-2"
                        />
                      )}
                    />
                    <label className="text-sm font-medium text-gray-700">Available</label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
                  >
                    {editingBook ? 'Update' : 'Add'} Book
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Books List</h2>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Author</th>
                    <th className="px-4 py-2 text-left">Publication Year</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Available</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book.bookId} className="border-t">
                      <td className="px-4 py-2">{book.title}</td>
                      <td className="px-4 py-2">{book.author}</td>
                      <td className="px-4 py-2">{book.publication_year}</td>
                      <td className="px-4 py-2">{book.category}</td>
                      <td className="px-4 py-2">{book.stock_quantity}</td>

                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            book.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {book.available ? 'Available' : 'Borrowed'}
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
                          onClick={() => handleDelete(book.bookId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
