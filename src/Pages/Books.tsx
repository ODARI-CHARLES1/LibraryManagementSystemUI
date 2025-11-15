import { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
}

const Books = ({ embedded = false }: { embedded?: boolean }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    available: true
  });

  useEffect(() => {
   
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      const sampleBooks: Book[] = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', available: true },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', available: true },
        { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Dystopian', available: false },
      ];
      setBooks(sampleBooks);
      localStorage.setItem('books', JSON.stringify(sampleBooks));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      const updatedBooks = books.map(book =>
        book.id === editingBook.id ? { ...book, ...formData } : book
      );
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    } else {
      const newBook: Book = {
        id: Date.now(),
        ...formData
      };
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', author: '', isbn: '', category: '', available: true });
    setEditingBook(null);
    setShowForm(false);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      available: book.available
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  return (
    <div className='w-full overflow-hidden h-full gap-1 flex flex-col items-center'>
      {!embedded && <Navbar />}
      <div className='w-full flex gap-5'>
        {!embedded && <Sidebar />}
        <div className="w-full flex overflow-y-auto overflow-x-hidden items-start flex-col lg:flex-nowrap flex-wrap gap-5 p-8">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#313131]">Books Management</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Add Book
            </button>
          </div>

          {showForm && (
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                    <input
                      type="text"
                      value={formData.isbn}
                      onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">Available</label>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                    {editingBook ? 'Update' : 'Add'} Book
                  </button>
                  <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
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
                    <th className="px-4 py-2 text-left">ISBN</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-t">
                      <td className="px-4 py-2">{book.title}</td>
                      <td className="px-4 py-2">{book.author}</td>
                      <td className="px-4 py-2">{book.isbn}</td>
                      <td className="px-4 py-2">{book.category}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                          onClick={() => handleDelete(book.id)}
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