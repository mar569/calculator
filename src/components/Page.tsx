
import type { ReactNode } from 'react';
import { useTheme } from '../providers/useTheme';
import Navbar from './NavBar';
import { THEME_COLORS } from '../constants/themeConstants';

interface PageProps {
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div
            className="min-h-screen relative"
            style={{
                background: theme === 'dark' ? THEME_COLORS.dark.background : THEME_COLORS.light.background,
            }}
        >
            <div className="container mx-auto px-4">
                <Navbar />
                <main className="p-4 md:p-6">
                    {children}
                </main>
            </div>

            <div className="absolute bottom-1 left-1 text-gray-500 text-[12px]">
                v 1.0.4
            </div>
        </div>
    );
};

export default Page;

//hook_21^ovs1