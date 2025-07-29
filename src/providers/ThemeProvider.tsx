import React, { useEffect, useState } from 'react';

import { ThemeContext, type Theme, } from './ThemeContext';
import LoadingScreen from '../components/LoadimgScreen';


export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme);
        setLoading(false);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    if (loading) return <LoadingScreen />;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
