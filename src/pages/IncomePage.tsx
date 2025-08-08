import { memo } from 'react';
import { useSelector } from 'react-redux';
import StatisticsChart from '../components/StatisticsChart';
import TransactionList from '../components/TransactionList';
import type { RootState } from '../store/store';
import { motion } from 'framer-motion';

const IncomePage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);

    const totalIncome = transactions
        .filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.category !== 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses; // Calculate the balance

    const rentPercent = totalIncome * 0.2;
    const tobaccoPercent = totalIncome * 0.2;
    const otherPercent = totalIncome * 0.08;
    const totalPlannedExpenses = rentPercent + tobaccoPercent + otherPercent;


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
                        <span className="font-medium">Доходы:</span>
                        <span className="ml-auto text-lg font-bold text-green-600">
                            {totalIncome.toLocaleString()} ₽
                        </span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Расходы:</span>
                        <span className="ml-auto text-lg font-bold text-red-600">
                            {totalExpenses.toLocaleString()} ₽
                        </span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="font-medium">Остаток:</span>
                        <span className={`ml-auto text-lg font-bold ${balance >= 0 ? 'text-green-800' : 'text-red-600'}`}>
                            {balance.toLocaleString()} ₽
                        </span>
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
                        <span className="text-[16px] font-bold text-red-600">
                            {rentPercent.toLocaleString()} ₽
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на табаки:</span>
                        <span className="text-[16px] font-bold text-orange-600">
                            {tobaccoPercent.toLocaleString()} ₽
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Сумма на расходы:</span>
                        <span className="text-[16px] font-bold text-orange-600">
                            {otherPercent.toLocaleString()} ₽
                        </span>
                    </div>
                </div>
                <div className="flex items-center mb-2 mt-4">
                    <span className="font-medium">Желательно отложить:</span>
                    <span className="ml-auto text-[16px] font-bold text-red-500">
                        {totalPlannedExpenses.toLocaleString()} ₽
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
