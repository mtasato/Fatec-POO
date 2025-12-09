import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CirclePlus } from "lucide-react";

interface AccessibilityFeature {
    id: number;
    name: string;
    description: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feature: any) => void;
    featureToEdit?: AccessibilityFeature;
}

export function AccessibilityFeatureModal({
    isOpen,
    onClose,
    onSubmit,
    featureToEdit,
}: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (featureToEdit) {
            setName(featureToEdit.name);
            setDescription(featureToEdit.description);
        } else {
            resetForm();
        }
    }, [featureToEdit, isOpen]);

    const resetForm = () => {
        setName("");
        setDescription("");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const feature = {
            name,
            description,
        };

        onSubmit(feature);
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-color/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                <div className="p-6">
                    <h2 className="text-2xl font-title text-primary-color mb-6">
                        {featureToEdit ? "Editar Feature" : "Cadastrar Feature"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Nome da feature"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm mb-2">Descrição</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Descrição"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                className="flex-1 px-4 py-2 border rounded-lg hover:bg-neutral-10"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 flex items-center justify-center gap-2"
                            >
                                {featureToEdit ? "Salvar Alterações" : "Cadastrar"}
                                <CirclePlus size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
