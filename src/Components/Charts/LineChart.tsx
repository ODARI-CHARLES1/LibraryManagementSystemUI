import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { useContext } from 'react';
import appContext from '../../Contexts/AppContext';

const borrowedData = [2400, 1398, 3800, 3908, 4800, 3800, 4300];
const returnedData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
];

export default function BiaxialLineChart() {
  const { theme } = useContext(appContext);

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
        xAxis={[{ 
          scaleType: 'point', 
          data: xLabels
        }]}
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