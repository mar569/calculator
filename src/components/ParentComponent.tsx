import { useState } from 'react';
import { useSelector } from 'react-redux';
import TransactionList from './TransactionList';
import type { RootState } from '../store/store';
import type { Transaction } from '../store/financeSlice';
import EditTransactionForm from './EditTransactionFrom';


const ParentComponent = () => {
    const transactions = useSelector((state: RootState) => state.finance.transactions); // Получите транзакции из Redux store
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null); // Храните редактируемую транзакцию

    const handleEditTransaction = (transaction: Transaction) => {
        console.log('Редактируемая транзакция:', transaction); // Для отладки
        setEditingTransaction(transaction);
    };

    const handleCloseEditForm = () => {
        setEditingTransaction(null); // Закройте форму редактирования
    };

    return (
        <div>
            <TransactionList
                transactions={transactions}
                onEditTransaction={handleEditTransaction}
            />
            {editingTransaction && (
                <EditTransactionForm
                    transaction={editingTransaction}
                    onClose={handleCloseEditForm}
                />
            )}
        </div>
    );
};

export default ParentComponent;
