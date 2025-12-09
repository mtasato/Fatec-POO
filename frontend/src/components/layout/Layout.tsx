import { useState, useEffect, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const checkScreen = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                isMobile={isMobile}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className={`transition-all duration-300 flex-1 ${!isMobile && sidebarOpen ? 'lg:ml-64' : 'pt-[50px]'}`}>
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
