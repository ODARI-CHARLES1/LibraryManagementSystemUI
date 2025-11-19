import { useContext } from 'react';
import appContext from '../../Contexts/AppContext';

interface Data {
  id: number;
  bookTitle: string;
  borrower: string;
  dueDate: string;
  status: string;
}

const sampleData: Data[] = [
  { id: 1, bookTitle: 'The Great Gatsby', borrower: 'John Doe', dueDate: '2024-01-15', status: 'Overdue' },
  { id: 2, bookTitle: 'To Kill a Mockingbird', borrower: 'Jane Smith', dueDate: '2024-01-18', status: 'Overdue' },
  { id: 3, bookTitle: '1984', borrower: 'Bob Johnson', dueDate: '2024-01-20', status: 'Overdue' },
  { id: 4, bookTitle: 'Pride and Prejudice', borrower: 'Alice Brown', dueDate: '2024-01-22', status: 'Due Soon' },
  { id: 5, bookTitle: 'The Catcher in the Rye', borrower: 'Charlie Davis', dueDate: '2024-01-25', status: 'Active' },
];

export default function SimpleTable() {
  const { theme } = useContext(appContext);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className={theme === "light" ? "bg-gray-100" : "bg-gray-700"}>
            <th className={`px-4 py-2 text-left text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
              Book Title
            </th>
            <th className={`px-4 py-2 text-left text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
              Borrower
            </th>
            <th className={`px-4 py-2 text-left text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
              Due Date
            </th>
            <th className={`px-4 py-2 text-left text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row) => (
            <tr
              key={row.id}
              className={`${theme === "light" ? "border-t border-gray-200 hover:bg-gray-50" : "border-t border-gray-600 hover:bg-gray-700"}`}
            >
              <td className={`px-4 py-2 text-sm ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                {row.bookTitle}
              </td>
              <td className={`px-4 py-2 text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                {row.borrower}
              </td>
              <td className={`px-4 py-2 text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                {row.dueDate}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Overdue'
                      ? 'bg-red-100 text-red-800'
                      : row.status === 'Due Soon'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}