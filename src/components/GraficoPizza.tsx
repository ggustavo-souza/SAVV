import {Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions} from 'chart.js';
import { Pie } from 'react-chartjs-2'

interface GraficoPizzaProps {
    dadosGrafico: number[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

export default function GraficoPizza({dadosGrafico}: GraficoPizzaProps) {
    
  const data = {
    labels: ['Poda', 'Erradicação', 'Plantio'],
    datasets: [
      {
        label: 'Votes',
        
        data: dadosGrafico,
        backgroundColor: [
          'rgba(5, 65, 0)',
          'rgba(5, 100, 60)',
          'rgba(20, 150, 80)',
        ],
        borderColor: [
          'rgba(5, 65, 0)',
          'rgba(140, 210, 156)',
          'rgba(80, 190, 156)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <>
      <h2>Gráfico de Pizza</h2>
      <Pie data={data} options={options} />
    </>
  );
}