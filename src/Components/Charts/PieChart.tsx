
import {PieChart} from '@mui/x-charts/PieChart'
export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Borrowed Books' },
            { id: 1, value: 15, label: 'Returned Books' },
            { id: 2, value: 20, label: 'Overdue Books' },
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
}