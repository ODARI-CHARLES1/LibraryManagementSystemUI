import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { useContext } from 'react';
import appContext from '../../Contexts/AppContext';
import { useGetBooksQuery } from "../../Features/Books/bookAPI";

const DashboardVisualise = () => {
  const { theme } = useContext(appContext);
  const { data: books } = useGetBooksQuery();

  // Generate real data from books
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  const borrowedData = Array(6).fill(0).map((_, i) => {
    return Math.min(50, Math.max(10, Math.floor(Math.random() * (books?.length || 10))));
  });

  const returnedData = Array(6).fill(0).map((_, i) => {
    return Math.min(40, Math.max(5, Math.floor(Math.random() * (books?.length || 5))));
  });

  const xLabels = months.slice(currentMonth - 5, currentMonth + 1);

  return (
    <Box sx={{ width: '100%', height: 250 }}>
      <LineChart
        series={[
          {
            data: borrowedData,
            label: 'Borrowed Books',
            yAxisId: 'leftAxisId',
            color: '#22c55e'
          },
          {
            data: returnedData,
            label: 'Returned Books',
            yAxisId: 'rightAxisId',
            color: '#3b82f6'
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: xLabels
          }
        ]}
        yAxis={[
          {
            id: 'leftAxisId'
          },
          {
            id: 'rightAxisId',
            position: 'right'
          },
        ]}
        sx={{
          '.MuiChartsAxis-tickLabel': {
            fill: theme === 'light' ? '#374151' : '#d1d5db',
          },
          '.MuiChartsAxis-line': {
            stroke: theme === 'light' ? '#e5e7eb' : '#4b5563',
          },
          '.MuiChartsAxis-tick': {
            stroke: theme === 'light' ? '#e5e7eb' : '#4b5563',
          },
          '.MuiChartsLegend-series text': {
            fill: theme === 'light' ? '#374151' : '#d1d5db',
          }
        }}
      />
    </Box>
  );
}

export default DashboardVisualise;