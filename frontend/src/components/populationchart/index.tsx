import { PopulationData } from "@/domain";
import { Bar } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function PopulationChart(
    { data }: { data?: PopulationData[] | null }
) {
    if (!data) {
        return <p>No informations</p>
    }

    const mData = {
        labels: data.map(item => `${item.year}`),
        datasets: [{
            data: data.map(item => `${item.value}`),
            backgroundColor: [
                'rgba(0, 0, 0, 0.2)',
            ],
            borderColor: [
                'rgb(0, 0, 0',
            ],
            borderWidth: 1
        }]
    };

    return (
        <Bar
            data={mData}
            options={{
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}