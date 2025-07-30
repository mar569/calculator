import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTransactions } from '../store/financeSlice';
import TransactionList from '../components/TransactionList';
import FinanceCalculator from '../components/FinanceCalculator';
import type { Transaction } from '../store/financeSlice';
import { motion } from 'framer-motion';

const FinancePage = memo(() => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector((state) => state.finance.transactions);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [newTransactionAdded, setNewTransactionAdded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransactions());
        };
        fetchData();
    }, [dispatch]);

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);
    };

    const handleNewTransaction = () => {
        setNewTransactionAdded(true);
        setTimeout(() => setNewTransactionAdded(false), 2000);
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <h1 className="text-2xl text-gray-500">Управление финансами</h1>
                {newTransactionAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm"
                    >
                        Новая транзакция добавлена!
                    </motion.div>
                )}
            </motion.div>

            <FinanceCalculator
                onTransactionAdded={handleNewTransaction}
                transactionToEdit={editingTransaction}
                isEditing={!!editingTransaction}
                onCancelEdit={() => setEditingTransaction(null)}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <TransactionList
                    transactions={transactions}
                    onEditTransaction={handleEditTransaction}
                />
            </motion.div>
        </div>
    );
});

export default FinancePage;
