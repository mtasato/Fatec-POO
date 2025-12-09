import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CreateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: ReactNode;
    fullWidth?: boolean;
}

export function CreateButton({
    label,
    icon,
    fullWidth = false,
    className = "",
    ...props
}: CreateButtonProps) {
    return (
        <button
            {...props}
            className={`
                ${fullWidth ? "w-full" : ""}
                flex items-center justify-center gap-2 
                px-12 py-4
                bg-primary-color text-white 
                rounded-lg 
                hover:bg-primary-color/90 
                transition-colors 
                font-default
                cursor-pointer
                ${className}
            `}
        >
            {label}
            {icon}
        </button>
    );
}
