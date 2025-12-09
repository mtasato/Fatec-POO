import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CirclePlus } from "lucide-react";
import { apiRequest } from "../../services/api";

interface AccessibilityFeature {
    id: number;
    name?: string;
}

interface VanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (van: any) => void;
    vanToEdit?: {
        id: number;
        model: string;
        brand: string;
        color: string;
        year: number;
        licensePlate: string;
        numberOfSeats: number;
        hasWifi: boolean;
        hasAirConditioning: boolean;
        hasStorageSpace: boolean;
        accessibilityFeatures: AccessibilityFeature[];
    };
}

export function VanModal({ isOpen, onClose, onSubmit, vanToEdit }: VanModalProps) {
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState(2024);
    const [licensePlate, setLicensePlate] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState(12);
    const [hasWifi, setHasWifi] = useState(false);
    const [hasAirConditioning, setHasAirConditioning] = useState(false);
    const [hasStorageSpace, setHasStorageSpace] = useState(false);

    const [features, setFeatures] = useState<AccessibilityFeature[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

    useEffect(() => {
        if (!isOpen) return;

        const loadFeatures = async () => {
            try {
                const response = await apiRequest("/accessibility-features");
                const data = await response.json();
                setFeatures(data);
            } catch {
                setFeatures([]);
            }
        };

        loadFeatures();
    }, [isOpen]);

    useEffect(() => {
        if (vanToEdit) {
            setModel(vanToEdit.model);
            setBrand(vanToEdit.brand);
            setColor(vanToEdit.color);
            setYear(vanToEdit.year);
            setLicensePlate(vanToEdit.licensePlate);
            setNumberOfSeats(vanToEdit.numberOfSeats);
            setHasWifi(vanToEdit.hasWifi);
            setHasAirConditioning(vanToEdit.hasAirConditioning);
            setHasStorageSpace(vanToEdit.hasStorageSpace);
            setSelectedFeatures(vanToEdit.accessibilityFeatures.map(f => f.id));
        } else {
            resetForm();
        }
    }, [vanToEdit, isOpen]);

    const resetForm = () => {
        setModel("");
        setBrand("");
        setColor("");
        setYear(2024);
        setLicensePlate("");
        setNumberOfSeats(12);
        setHasWifi(false);
        setHasAirConditioning(false);
        setHasStorageSpace(false);
        setSelectedFeatures([]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const van = {
            model,
            brand,
            color,
            year,
            licensePlate,
            numberOfSeats,
            hasWifi,
            hasAirConditioning,
            hasStorageSpace,
            accessibilityFeatures: selectedFeatures.map(id => ({ id })),
        };

        onSubmit(van);
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-color/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                <div className="p-6">
                    <h2 className="text-2xl font-title text-primary-color mb-6">
                        {vanToEdit ? "Editar Van" : "Cadastrar Van"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Modelo</label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                placeholder="Modelo da van"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Marca</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                placeholder="Marca"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Cor</label>
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                placeholder="Cor"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Ano</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                min={1990}
                                max={2025}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Placa</label>
                            <input
                                type="text"
                                value={licensePlate}
                                onChange={(e) => setLicensePlate(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                placeholder="VAN-1234"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-neutral-70 mb-2">Número de Assentos</label>
                            <input
                                type="number"
                                value={numberOfSeats}
                                onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                                min={10}
                                max={30}
                                className="w-full px-4 py-2 border border-neutral-20 rounded-lg"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 my-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={hasWifi}
                                    onChange={(e) => setHasWifi(e.target.checked)}
                                />
                                Wi-Fi
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={hasAirConditioning}
                                    onChange={(e) => setHasAirConditioning(e.target.checked)}
                                />
                                Ar-condicionado
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={hasStorageSpace}
                                    onChange={(e) => setHasStorageSpace(e.target.checked)}
                                />
                                Espaço de Bagagem
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-neutral-70 mb-2">Acessibilidades</label>
                            <div className="border border-neutral-20 rounded-lg p-4 max-h-48 overflow-y-auto">
                                {features.length === 0 ? (
                                    <p className="text-sm text-neutral-60">Nenhuma acessibilidade disponível</p>
                                ) : (
                                    <div className="space-y-2">
                                        {features.map((f) => (
                                            <label key={f.id} className="flex items-center gap-2 cursor-pointer hover:bg-neutral-10 p-2 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFeatures.includes(f.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedFeatures([...selectedFeatures, f.id]);
                                                        } else {
                                                            setSelectedFeatures(selectedFeatures.filter(id => id !== f.id));
                                                        }
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-neutral-70">{f.name || `Acessibilidade ${f.id}`}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => { resetForm(); onClose(); }}
                                className="cursor-pointer flex-1 px-4 py-2 border border-neutral-20 text-neutral-70 rounded-lg hover:bg-neutral-10 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer flex-1 px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition-colors flex items-center justify-center gap-2"
                            >
                                {vanToEdit ? "Salvar Alterações" : "Cadastrar"}
                                <CirclePlus size={20} className="text-white" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
