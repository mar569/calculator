import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import FinanceCalculator from '../components/FinanceCalculator';
import StatisticsChart from '../components/StatisticsChart';
import Calendar from '../components/Calendar';
import type { RootState } from '../store/store';
import type { Transaction } from '../store/financeSlice';

const DashboardPage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);


    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl text-gray-200">Главная панель</h1>
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

        </div>
    );
});

export default DashboardPage;
