import { memo } from 'react';
import { useSelector } from 'react-redux';
import StatisticsChart from '../components/StatisticsChart';
import TransactionList from '../components/TransactionList';
import type { RootState } from '../store/store';
import { FaMoneyBillWave, FaHome, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const IncomePage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);

    const revenue = transactions.filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const rent = 35000;
    const rentDeduction = revenue * 0.2;
    const tobaccoExpenses = revenue * 0.2;
    const otherExpenses = revenue * 0.08;
    const totalExpenses = rent + rentDeduction + tobaccoExpenses + otherExpenses;
    const netIncome = revenue - totalExpenses;

    const remainingToSave = rent - rentDeduction;
    const totalSpecificExpenses = rentDeduction + tobaccoExpenses + otherExpenses;

    const cushion = revenue - totalSpecificExpenses;

    return (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="border-b">
                    <h2 className="text-xl font-semibold mb-4">Отложенные расходы</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col pt-4">
                        <span className="font-medium">Сумма на аренду:</span>
                        <span className="text-[16px] font-bold text-red-600">{rentDeduction.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на табаки:</span>
                        <span className="text-[16px] font-bold text-orange-600">{tobaccoExpenses.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на расходы:</span>
                        <span className="text-[16px] font-bold text-orange-600">{otherExpenses.toLocaleString()} ₽</span>
                    </div>
                </div>
                <div className="flex items-center mb-2 mt-4">
                    <span className="font-medium">Отложить:</span>
                    <span className="ml-auto text-[16px] font-bold text-red-500">{totalSpecificExpenses.toLocaleString()} ₽</span>
                </div>
                <div className="flex items-center mb-2 border-t border-dashed border-gray-300 pt-4">
                    <span className="font-medium">Подушка:</span>
                    <span className={`ml-auto text-[16px] font-bold ${cushion >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {cushion.toLocaleString()} ₽
                    </span>
                </div>
                <div className="flex items-center mb-2 border-t border-dashed border-gray-300 pt-4">
                    <span className="font-medium">Осталось накопить на аренду:</span>
                    <span className={`ml-auto text-[16px] font-bold ${remainingToSave <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {remainingToSave.toLocaleString()} ₽
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
