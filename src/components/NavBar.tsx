import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../providers/useTheme';
import ThemeSwitcher from './ThemeSwitcher';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { theme } = useTheme();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const links = [
        { path: '/', label: 'Главная' },
        { path: '/finance', label: 'Финансы' },
        { path: '/income', label: 'Учет' },
        { path: '/reports', label: 'Отчеты' },
        { path: '/settings', label: 'Заметки' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const activeLinkStyle = {
        boxShadow: '1px 1px 20px rgba(163, 177, 198, 0.6), -1px -1px 20px rgba(255, 255, 255, 0.8)'
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 200, 0.5);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-opacity duration-300`} style={{ opacity, backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-24">
                    <button className="md:hidden p-2" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <XMarkIcon className="h-10 w-10" />
                        ) : (
                            <Bars3Icon className="h-10 w-10" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsMenuOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    <nav className={`absolute md:static inset-x-0 top-24 md:top-0 mx-auto ${isMenuOpen ? 'block' : 'hidden'} md:block bg-transparent w-full md:w-auto z-50`}>
                        <motion.div
                            className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {links.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`font-medium px-3 py-2 rounded-md transition-all duration-300
                                        ${pathname === link.path ?
                                            'text-white font-bold shadow-sm' :
                                            'text-gray-700 hover:text-white '}
                                    `}
                                    style={pathname === link.path ? activeLinkStyle : {}}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </motion.div>
                    </nav>

                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
