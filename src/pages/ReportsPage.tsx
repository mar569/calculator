import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import type { RootState } from '../store/store';
import { CATEGORY_LABELS, THEME_COLORS } from '../constants/themeConstants';
import { useTheme } from '../providers/useTheme';
import { motion } from 'framer-motion';
import type { Transaction } from '../store/financeSlice';
import React from 'react';

Chart.register(...registerables);

const ReportsPage = memo(() => {
    const transactions = useSelector((state: RootState) => state.finance.transactions);
    const { theme } = useTheme();
    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

    const getFilteredTransactions = (): Transaction[] => {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= (startDate || new Date(0)) && transactionDate <= (endDate || new Date());
        });
    };

    const createReportData = () => {
        const categories = ['revenue', 'expense', 'tobacco', 'rent'];
        const labels = Object.values(CATEGORY_LABELS);

        return {
            labels,
            datasets: [{
                label: 'Сумма',
                data: categories.map(category =>
                    getFilteredTransactions()
                        .filter(t => t.category === category)
                        .reduce((sum, t) => sum + t.amount, 0)
                ),
                backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'],
            }]
        };
    };

    const groupTransactionsByDate = (transactions: Transaction[]): Record<string, Transaction[]> => {
        return transactions.reduce<Record<string, Transaction[]>>((groups, transaction) => {
            const date = new Date(transaction.date).toLocaleDateString('ru-RU');
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(transaction);
            return groups;
        }, {});
    };

    const groupedTransactions = groupTransactionsByDate(getFilteredTransactions());

    const totalIncome = getFilteredTransactions()
        .filter(t => t.category === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = getFilteredTransactions()
        .filter(t => t.category === 'expense')
        .reduce((sum, t) => sum - t.amount, 0);

    const toggleGroup = (date: string) => {
        setOpenGroups(prev => ({ ...prev, [date]: !prev[date] }));
    };

    return (
        <motion.div className={`page-container space-y-6 mb-4 ${theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl text-gray-500">Отчеты</h1>

            <div className={`bg-white rounded-lg shadow-md p-6 ${theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background}`}>
                <h2 className="text-xl font-semibold mb-4">Выберите период</h2>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Начальная дата</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat={'dd.MM.yyyy'}
                            className={`w-full p-2 border rounded-md ${theme === 'dark' ? THEME_COLORS.dark.border : THEME_COLORS.light.border}`}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Конечная дата</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat={'dd.MM.yyyy'}
                            minDate={startDate ? startDate : undefined}
                            className={`w-full p-2 border rounded-md ${theme === 'dark' ? THEME_COLORS.dark.border : THEME_COLORS.light.border}`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`bg-white rounded-lg shadow-md p-6 ${theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background}`}>
                    <h2 className="text-xl font-semibold mb-4">Финансовый отчет</h2>
                    <Bar
                        data={createReportData()}
                        options={{ responsive: true }}
                    />
                </div>

                <div className={`bg-white rounded-lg shadow-md p-6 ${theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background}`}>
                    <h2 className="text-xl font-semibold mb-4">Детали</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="px-4 ">Дата</th>
                                    <th className="px-4 ">Описание</th>
                                    <th className="px-4 ">Категория</th>
                                    <th className="px-4 ">Сумма</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                                    <React.Fragment key={date}>
                                        <tr>
                                            <td colSpan={4} className="font-semibold text-lg text-gray-800 pl-4 pt-2 cursor-pointer" onClick={() => toggleGroup(date)}>
                                                <span>{openGroups[date]}Детали за {date}</span>
                                            </td>
                                        </tr>
                                        {openGroups[date] && (
                                            <motion.tr
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <td colSpan={4}>
                                                    <table className="w-full">
                                                        <tbody>
                                                            {transactions.map((transaction) => (
                                                                <tr key={transaction.id}>
                                                                    <td className="px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                                                    <td className="px-4 py-2">{transaction.description}</td>
                                                                    <td className="px-4 py-2">
                                                                        <span className={`px-2 py-1 rounded-full text-xs ${transaction.category === 'revenue'
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                            }`}>
                                                                            {transaction.category === 'revenue' ? 'Доход' : 'Расход'}
                                                                        </span>
                                                                    </td>
                                                                    <td className={`font-medium px-4 py-2 ${transaction.category === 'revenue'
                                                                        ? 'text-green-600'
                                                                        : 'text-red-600'
                                                                        }`}>
                                                                        {transaction.amount}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </motion.tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={`bg-white rounded-lg shadow-md p-6 ${theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background}`}>
                <h2 className="text-[18px] font-semibold mb-2">Общий доход за весь период:</h2>
                <p className="text-lg font-bold text-green-600 mb-4 pl-4">{totalIncome.toLocaleString()} ₽</p>
                <h2 className="text-[18px] font-semibold mb-2">Общие расходы за весь период:</h2>
                <p className="text-lg font-bold text-red-500 pl-4">{totalExpense.toLocaleString()} ₽</p>
            </div>
        </motion.div>
    );
});

export default ReportsPage;
