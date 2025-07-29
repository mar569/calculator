import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks'; // Импортируйте типизированный хук
import { addTransaction, editTransaction, type Transaction } from '../store/financeSlice';
import { toast } from 'react-toastify';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface TransactionForm {
    amount: number;
    description: string;
    category: string;
}

interface FinanceCalculatorProps {
    transactionToEdit: Transaction | null;
    isEditing: boolean;
    onCancelEdit: () => void;
    onTransactionAdded?: () => void;
}

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
    transactionToEdit,
    isEditing,
    onCancelEdit,
    onTransactionAdded = () => { }
}) => {
    const dispatch = useAppDispatch(); // Используйте типизированный dispatch

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionForm>({
        defaultValues: {
            amount: 0,
            description: '',
            category: 'revenue'
        }
    });

    useEffect(() => {
        if (transactionToEdit) {
            reset({
                amount: transactionToEdit.amount,
                description: transactionToEdit.description,
                category: transactionToEdit.category
            });
        }
    }, [transactionToEdit, reset]);

    const onSubmit: SubmitHandler<TransactionForm> = async (data) => {
        const transaction: Omit<Transaction, 'id'> = {
            amount: Number(data.amount),
            description: data.description,
            category: data.category,
            date: new Date().toISOString()
        };

        if (isEditing && transactionToEdit) {
            dispatch(editTransaction({ ...transaction, id: transactionToEdit.id }));
            toast.success('Транзакция обновлена');
            onCancelEdit();
        } else {
            await dispatch(addTransaction(transaction));
            toast.success('Транзакция добавлена');
            reset();
            onTransactionAdded();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Редактировать запись' : 'Добавить запись'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сумма</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('amount', { required: 'Сумма обязательна', min: { value: 0.01, message: 'Сумма должна быть больше 0' } })}
                        className={`w-full p-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        placeholder="0.00"
                    />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                    <input
                        type="text"
                        {...register('description', { required: 'Описание обязательно' })}
                        className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        placeholder="Детали транзакции"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                    <select
                        {...register('category')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="revenue">Доход</option>
                        <option value="expense">Расход</option>
                    </select>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-[#1F034D] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#221b2f] transition"
                    >
                        {isEditing ? 'Сохранить' : 'Добавить'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Отмена
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FinanceCalculator;
