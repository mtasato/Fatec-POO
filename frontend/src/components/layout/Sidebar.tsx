import { useState } from "react";
import { Menu, Accessibility, BusFront, Bus } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Acessibilidade", icon: Accessibility, to: "/acessibility" },
    { label: "Ônibus", icon: BusFront, to: "/bus" },
    { label: "Van", icon: Bus, to: "/van" },
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isMobile: boolean;
}

export function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {isMobile && (
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="absolute top-4 left-4 z-50 p-2 bg-primary text-primary-color rounded-md shadow-md"
                >
                    <Menu size={26} />
                </button>
            )}

            {isMobile && mobileMenuOpen && (
                <div className="absolute top-16 left-4 w-52 bg-white border rounded-lg shadow-xl p-3 z-50">
                    {menuItems.map(({ label, icon: Icon, to }) => (
                        <NavLink
                            key={label}
                            to={to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-md text-gray-700 font-default
                                ${isActive ? "text-secondary-color bg-gray-200" : "hover:bg-gray-100"}`
                            }
                        >
                            <Icon size={20} /> <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            )}

            {!isMobile && (
                <aside
                    className={`fixed top-0 left-0 h-full bg-primary shadow-xl text-secondary-color transition-all duration-300 flex flex-col 
                        ${isOpen ? "w-64" : "w-20"}`}

                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="relative">
                        <div className="flex justify-center items-center px-3 py-6">
                            {isOpen ? (
                                <img
                                    src="../../../public/logo/logo-poo.png"
                                    className="max-h-14"
                                />
                            ) : (
                                <img
                                    src="../../../public/logo/logo-poo.png"
                                    className="w-10 h-10 bg-primary-color rounded-md p-1"
                                />
                            )}
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map(({ label, icon: Icon, to }) => (
                            <NavLink
                                key={label}
                                to={to}
                                className={({ isActive }) =>
                                    `font-default flex items-center gap-3 p-3 rounded-lg transition 
                                    ${!isOpen && "justify-center"} 
                                    ${isActive ? "bg-primary-color text-secondary-color" : "hover:bg-primary-color"}`
                                }
                            >
                                <Icon size={24} />
                                {isOpen && <span>{label}</span>}
                            </NavLink>

                        ))}
                    </nav>
                </aside>
            )}
        </>
    );
}
