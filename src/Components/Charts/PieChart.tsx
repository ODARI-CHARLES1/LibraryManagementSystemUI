import { PieChart } from '@mui/x-charts/PieChart';
import { useContext } from 'react';
import appContext from '../../Contexts/AppContext';
import { useGetBooksQuery } from "../../Features/Books/bookAPI";

export default function BasicPie() {
  const { theme } = useContext(appContext);
  const { data: books } = useGetBooksQuery();

  const totalBooks = books?.length || 1;
  const availableBooks = books?.filter(book => book.stock_quantity > 0).length || 0;
  const borrowedBooks = totalBooks - availableBooks;

  const availablePercentage = totalBooks > 0 ? Math.round((availableBooks / totalBooks) * 100) : 0;
  const borrowedPercentage = totalBooks > 0 ? Math.round((borrowedBooks / totalBooks) * 100) : 0;
  const returnedPercentage = 100 - availablePercentage - borrowedPercentage;

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: availablePercentage, label: 'Available Books', color: '#22c55e' },
            { id: 1, value: borrowedPercentage, label: 'Borrowed Books', color: '#3b82f6' },
            { id: 2, value: returnedPercentage, label: 'Returned Books', color: '#ef4444' },
          ],
        },
      ]}
      width={200}
      height={200}
      sx={{
        '.MuiChartsLegend-series text': {
          fill: theme === 'light' ? '#374151' : '#d1d5db',
        }
      }}
    />
  );
}