import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTransaction, type Transaction } from '../store/financeSlice';

interface EditTransactionFormProps {
    transaction: Transaction | null;
    onClose: () => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transaction, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
        description: '',
        amount: 0,
        category: '',
        date: new Date().toISOString()
    });

    useEffect(() => {
        if (transaction) {
            setFormData({
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
                date: transaction.date
            });
        }
    }, [transaction]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (transaction) {
            dispatch(editTransaction({
                ...transaction,
                ...formData
            }));
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Редактировать транзакцию</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Сумма (₽)</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Дата</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date.split('T')[0]}
                            onChange={(e) => setFormData({
                                ...formData,
                                date: new Date(e.target.value).toISOString()
                            })}
                            className="border rounded w-full p-2"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionForm;
