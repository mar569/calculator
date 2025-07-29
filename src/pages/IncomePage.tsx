import { memo } from 'react';
import { useSelector } from 'react-redux';
import StatisticsChart from '../components/StatisticsChart';
import TransactionList from '../components/TransactionList';
import type { RootState } from '../store/store';
import { FaMoneyBillWave, FaHome, FaChartLine } from 'react-icons/fa';

const IncomePage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);

    const revenue = transactions.filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const rent = 35000;
    const rentDeduction = revenue * 0.2;
    const tobaccoExpenses = revenue * 0.2;
    const otherExpenses = revenue * 0.05;
    const totalExpenses = rent + rentDeduction + tobaccoExpenses + otherExpenses;
    const netIncome = revenue - totalExpenses;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Управление доходами</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <StatisticsChart transactions={transactions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Финансовая сводка</h2>
                    <div className="flex items-center mb-2">
                        <FaMoneyBillWave className="text-green-600 mr-2" />
                        <span className="font-medium">Доходы:</span>
                        <span className="ml-auto text-lg font-bold text-green-600">{revenue.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaHome className="text-red-600 mr-2" />
                        <span className="font-medium">Аренда:</span>
                        <span className="ml-auto text-lg font-bold text-red-600">{rent} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaChartLine className="text-orange-600 mr-2" />
                        <span className="font-medium">Расходы на аренду (20%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{rentDeduction.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Расходы на табак (20%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{tobaccoExpenses.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Прочие расходы (5%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{otherExpenses.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Общие расходы:</span>
                        <span className="ml-auto text-lg font-bold text-red-600">{totalExpenses.toLocaleString()} ₽</span>
                    </div>
                    <div className={`flex items-center font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>Чистая прибыль:</span>
                        <span className="ml-auto text-lg">{netIncome.toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>

            <TransactionList
                transactions={transactions}
                onEditTransaction={() => { }}
            />
        </div>
    );
});

export default IncomePage;
