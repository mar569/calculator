import { memo, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaHeartCirclePlus } from "react-icons/fa6";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface Reminder {
    id: string;
    text: string;
}

const SettingsPage = memo(() => {
    const [notes, setNotes] = useState('');
    const [reminders, setReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        const fetchReminders = async () => {
            const remindersCollection = collection(db, 'reminders');
            const reminderSnapshot = await getDocs(remindersCollection);
            const reminderList = reminderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Reminder[];
            setReminders(reminderList);
        };

        fetchReminders();
    }, []);

    const handleAddReminder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (notes.trim()) {
            const docRef = await addDoc(collection(db, 'reminders'), { text: notes });
            setReminders([...reminders, { id: docRef.id, text: notes }]);
            setNotes('');
        }
    };

    const handleDeleteReminder = async (id: string) => {
        await deleteDoc(doc(db, 'reminders', id));
        setReminders(reminders.filter(reminder => reminder.id !== id));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl text-gray-500 mb-4">Заметки</h1>
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
                        className="ml-2 bg-gray-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600"
                    >
                        <FaHeartCirclePlus />
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Твои напоминания</h2>
                <ul className="list-disc pl-5">
                    {reminders.length > 0 ? (
                        reminders.map((reminder) => (
                            <motion.li
                                key={reminder.id}
                                className="mb-2 flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {reminder.text}
                                <button onClick={() => handleDeleteReminder(reminder.id)} className="ml-2 bg-gray-200 text-red-500 p-2 rounded-md cursor-pointer hover:bg-gray-600">
                                    <FaTrash />
                                </button>
                            </motion.li>
                        ))
                    ) : (
                        <li>Нет напоминаний. Добавь свои заметки выше!</li>
                    )}
                </ul>
            </div>
        </motion.div>
    );
});

export default SettingsPage;
