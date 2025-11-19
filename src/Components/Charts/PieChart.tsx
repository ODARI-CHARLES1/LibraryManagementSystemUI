import { PieChart } from '@mui/x-charts/PieChart';
import { useContext } from 'react';
import appContext from '../../Contexts/AppContext';

export default function BasicPie() {
  const { theme } = useContext(appContext);

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 45, label: 'Borrowed Books', color: '#22c55e' },
            { id: 1, value: 30, label: 'Returned Books', color: '#3b82f6' },
            { id: 2, value: 15, label: 'Overdue Books', color: '#ef4444' },
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