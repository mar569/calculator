import React, { useState, useEffect } from 'react';
import { useTheme } from '../providers/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        toggleTheme();
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <button
            onClick={handleClick}
            className={`
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        ${theme === 'dark' ? 'bg-indigo-900' : 'bg-amber-100'}
        transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${theme === 'dark' ? 'focus:ring-indigo-500' : 'focus:ring-amber-400'}
      `}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            <div className={`relative w-8 h-8 transition-all duration-500 ${isAnimating ? 'scale-125' : 'scale-100'}`}>

                <div className={`
          absolute transition-all duration-500
          ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          ${isAnimating ? 'text-yellow-400' : 'text-amber-500'}
        `}>
                    <SunIcon className="w-full h-full" />
                </div>


                <div className={`
          absolute transition-all duration-500
          ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}
          ${isAnimating ? 'text-indigo-100' : 'text-indigo-300'}
        `}>
                    <MoonIcon className="w-full h-full" />
                </div>


                <div className={`
          absolute inset-0 rounded-full transition-all duration-700
          ${isAnimating ? (theme === 'dark' ? 'bg-indigo-700' : 'bg-amber-400/20') : 'bg-transparent'}
          ${isAnimating ? 'scale-150' : 'scale-100'}
        `}></div>
            </div>


            <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`
            w-1 h-1 rounded-full transition-all duration-1000
            ${theme === 'dark' ? 'bg-indigo-400' : 'bg-amber-400'}
            ${isAnimating ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
          `}></div>
                ))}
            </div>
        </button>
    );
};

export default ThemeSwitcher;
