import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTransaction, type Transaction } from '../store/financeSlice';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

interface EditModalProps {
    transaction: Transaction;
    onClose: () => void;
    onSave?: (updatedTransaction: Transaction) => void;
}

const EditTransactionModal: React.FC<EditModalProps> = ({ transaction, onClose, onSave }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isDirty }, watch, reset } = useForm<Transaction>({
        defaultValues: transaction
    });

    // Автоматическое определение типа транзакции
    const transactionType = watch('category');

    useEffect(() => {
        reset(transaction);
    }, [transaction, reset]);

    const onSubmit: SubmitHandler<Transaction> = (data) => {
        const updatedTransaction = {
            ...data,
            id: transaction.id,
            amount: Number(data.amount),
            date: data.date || new Date().toISOString()
        };

        dispatch(editTransaction(updatedTransaction));
        onSave?.(updatedTransaction);
        toast.success('Транзакция обновлена');
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Редактировать транзакцию</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Описание</label>
                            <input
                                {...register('description', {
                                    required: 'Обязательное поле',
                                    maxLength: {
                                        value: 100,
                                        message: 'Максимум 100 символов'
                                    }
                                })}
                                className={`w-full p-3 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Название транзакции"
                            />
                            {errors.description && (
                                <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Сумма</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        {...register('amount', {
                                            required: 'Введите сумму',
                                            min: { value: 0.01, message: 'Минимум 0.01' }
                                        })}
                                        className={`w-full p-3 border rounded-lg ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <span className="absolute right-3 top-3 text-gray-500">₽</span>
                                </div>
                                {errors.amount && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Дата</label>
                                <input
                                    type="date"
                                    {...register('date', { required: 'Укажите дату' })}
                                    className={`w-full p-3 border rounded-lg ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.date.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Категория</label>
                            <select
                                {...register('category')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="revenue">Доход</option>
                                <option value="expense">Расход</option>
                                <option value="tobacco">Табак</option>
                                <option value="rent">Аренда</option>
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!isDirty}
                                className={`w-full py-3 px-4 rounded-lg font-medium ${isDirty
                                        ? transactionType === 'revenue'
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    } transition-colors`}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EditTransactionModal;
