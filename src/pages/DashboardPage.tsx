import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import FinanceCalculator from '../components/FinanceCalculator';
import StatisticsChart from '../components/StatisticsChart';
import Calendar from '../components/Calendar';
import type { RootState } from '../store/store';
import type { Transaction } from '../store/financeSlice';
import { motion } from 'framer-motion';

const DashboardPage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };

    return (
        <motion.div className="space-y-6 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl text-gray-500">Главная панель</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <StatisticsChart transactions={transactions} />
                </div>
                <div>
                    <Calendar />
                </div>
            </div>
            <FinanceCalculator
                transactionToEdit={editingTransaction}
                isEditing={!!editingTransaction}
                onCancelEdit={handleCancelEdit}
            />
        </motion.div>
    );
});

export default DashboardPage;
