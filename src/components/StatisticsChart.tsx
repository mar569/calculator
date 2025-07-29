import { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface StatisticsChartProps {
    transactions: { category: string; amount: number }[];
}

const StatisticsChart = memo(({ transactions }: StatisticsChartProps) => {
    const revenue = transactions.filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const rent = 35000;
    const rentDeduction = revenue * 0.2;
    const totalExpenses = rent + rentDeduction;
    const net = revenue - totalExpenses;

    const data = {
        labels: ['Доходы', 'Аренда (20%)', 'Табак (20%)', 'Прочие (10%)', 'Чистая прибыль'],
        datasets: [{
            data: [
                revenue,
                rentDeduction,
                revenue * 0.2,
                revenue * 0.05,
                net > 0 ? net : 0,
            ],
            backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#6366F1'],
            borderRadius: 6,
            barThickness: 40,
        }]
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl h-[334px]">
            <Bar
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: window.innerWidth <= 768 ? 12 : 14,
                                },
                                padding: 8,
                            },
                            grid: {
                                display: false,
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: window.innerWidth <= 768 ? 12 : 14,
                                    weight: 'bold',
                                },
                                color: '#374151',
                            },
                        }
                    },
                    elements: {
                        bar: {
                            borderWidth: 2,
                        },
                    },
                }}
            />
        </div>
    );
});

export default StatisticsChart;
