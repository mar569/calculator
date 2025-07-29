import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../store/hooks'; // Импортируйте типизированный хук
import { deleteTransaction, type Transaction } from '../store/financeSlice';
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface TransactionListProps {
    transactions: Transaction[];
    onEditTransaction: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEditTransaction }) => {
    const dispatch = useAppDispatch(); // Используйте типизированный dispatch
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = useCallback(async (id: string) => {
        setIsDeleting(id);
        try {
            await dispatch(deleteTransaction(id));
            toast.success('Транзакция удалена');
        } catch {
            toast.error('Ошибка при удалении');
        } finally {
            setIsDeleting(null);
        }
    }, [dispatch]);

    return (
        <div className=" overflow-hidden bg-white p-2 rounded-lg shadow">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold ">История транзакций</h2>
            </div>

            {transactions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    Нет транзакций для отображения
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {transactions.map((transaction) => (
                        <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 hover:bg-gray-50 transition-colors grid grid-cols-12 items-center"
                        >
                            <div className="col-span-5">
                                <div className="font-medium truncate">{transaction.description}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {new Date(transaction.date).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>

                            <div className={`col-span-4 text-right font-medium ${transaction.category === 'revenue' ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.category === 'revenue' ? '+' : '-'}
                                {transaction.amount.toLocaleString('ru-RU')} ₽
                            </div>

                            <div className="col-span-3 flex justify-end space-x-2">
                                <button
                                    onClick={() => onEditTransaction(transaction)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                    aria-label="Редактировать"
                                >
                                    <MdEditNote size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(transaction.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    aria-label="Удалить"
                                    disabled={isDeleting === transaction.id}
                                >
                                    {isDeleting === transaction.id ? (
                                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <MdDeleteForever size={20} />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default React.memo(TransactionList);
