import { memo, useState } from 'react';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const InventoryPage = memo(() => {
    const [notes, setNotes] = useState('');
    const [reminders, setReminders] = useState<string[]>([]);

    const handleAddReminder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (notes.trim()) {
            setReminders([...reminders, notes]);
            setNotes('');
        }
    };

    const handleDeleteReminder = (index: number) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Заметки</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Добавь напоминания</h2>
                <form onSubmit={handleAddReminder} className="flex items-center">
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Введите важные заметки или напоминания..."
                        className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <button
                        type="submit"
                        className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                    >
                        <FaPlusCircle />
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Ваши напоминания</h2>
                <ul className="list-disc pl-5">
                    {reminders.length > 0 ? (
                        reminders.map((reminder, index) => (
                            <motion.li
                                key={index}
                                className="mb-2 flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {reminder}
                                <button onClick={() => handleDeleteReminder(index)} className="text-red-500 hover:underline ml-2">
                                    <FaTrash />
                                </button>
                            </motion.li>
                        ))
                    ) : (
                        <li>Нет напоминаний. Добавьте свои заметки выше!</li>
                    )}
                </ul>
            </div>
        </div>
    );
});

export default InventoryPage;
