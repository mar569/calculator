import { memo } from 'react';
import { useSelector } from 'react-redux';
import StatisticsChart from '../components/StatisticsChart';
import TransactionList from '../components/TransactionList';
import type { RootState } from '../store/store';
import { FaMoneyBillWave, FaHome, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const IncomePage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);

    // Общий доход
    const totalIncome = transactions.filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const rentAmount = 35000;
    const rentCost = totalIncome * 0.2;
    const tobaccoCost = totalIncome * 0.2;
    const otherCost = totalIncome * 0.08;

    // Общие расходы
    const totalCosts = rentAmount + rentCost + tobaccoCost + otherCost;

    // Чистая прибыль
    const netProfit = totalIncome - totalCosts;

    // Остаток для накопления
    const amountToSave = rentAmount - rentCost;
    const totalPlannedExpenses = rentCost + tobaccoCost + otherCost;

    // Подушка 
    const savingsCushion = totalIncome - totalPlannedExpenses;

    return (
        <motion.div className="space-y-6 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl text-gray-500">Управление доходами</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <StatisticsChart transactions={transactions} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="border-b">
                        <h2 className="text-xl font-semibold mb-4">Финансовая сводка</h2>
                    </div>

                    <div className="flex items-center mb-2 pt-4">
                        <FaMoneyBillWave className="text-green-600 mr-2" />
                        <span className="font-medium">Доходы:</span>
                        <span className="ml-auto text-lg font-bold text-green-600">{totalIncome.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaHome className="text-red-600 mr-2" />
                        <span className="font-medium">Аренда:</span>
                        <span className="ml-auto text-lg font-bold text-red-600">{rentAmount} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaChartLine className="text-orange-600 mr-2" />
                        <span className="font-medium">Расходы на аренду (20%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{rentCost.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Расходы на табак (20%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{tobaccoCost.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Прочие расходы (5%):</span>
                        <span className="ml-auto text-lg font-bold text-orange-600">{otherCost.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Общие расходы:</span>
                        <span className="ml-auto text-lg font-bold text-red-600">{totalCosts.toLocaleString()} ₽</span>
                    </div>
                    <div className={`flex items-center font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>Чистая прибыль:</span>
                        <span className="ml-auto text-lg">{netProfit.toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="border-b">
                    <h2 className="text-xl font-semibold mb-4">Отложенные расходы</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col ">
                        <span className="font-medium">Сумма на аренду:</span>
                        <span className="text-[16px] font-bold text-red-600">{rentCost.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на табаки:</span>
                        <span className="text-[16px] font-bold text-orange-600">{tobaccoCost.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на расходы:</span>
                        <span className="text-[16px] font-bold text-orange-600">{otherCost.toLocaleString()} ₽</span>
                    </div>
                </div>
                <div className="flex items-center mb-2 mt-4">
                    <span className="font-medium">Отложить:</span>
                    <span className="ml-auto text-[16px] font-bold text-red-500">{totalPlannedExpenses.toLocaleString()} ₽</span>
                </div>
                <div className="flex items-center mb-2 border-t border-dashed border-gray-300 pt-4">
                    <span className="font-medium">Подушка:</span>
                    <span className={`ml-auto text-[16px] font-bold ${savingsCushion >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {savingsCushion.toLocaleString()} ₽
                    </span>
                </div>
                <div className="flex items-center mb-2 border-t border-dashed border-gray-300 pt-4">
                    <span className="font-medium">Осталось накопить на аренду:</span>
                    <span className={`ml-auto text-[16px] font-bold ${amountToSave <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {amountToSave.toLocaleString()} ₽
                    </span>
                </div>
            </div>

            <TransactionList
                transactions={transactions}
                onEditTransaction={() => { }}
            />
        </motion.div>
    );
});

export default IncomePage;
