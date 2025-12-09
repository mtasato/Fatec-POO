import type { ReactNode } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
    title?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    message = "Tem certeza que deseja excluir este item?",
    title = "Confirmação",
    confirmLabel = "Excluir",
    cancelLabel = "Cancelar",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-700 mb-6">{message}</p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
