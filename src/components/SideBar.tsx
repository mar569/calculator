import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="bg-light w-64 min-h-screen p-4 hidden md:block">
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-hookah-primary">Меню</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="sidebar-item">
                                <span className="ml-2">Главная</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/finance" className="sidebar-item">
                                <span className="ml-2">Финансы</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inventory" className="sidebar-item">
                                <span className="ml-2">Склад</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="sidebar-item">
                                <span className="ml-2">Настройки</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
