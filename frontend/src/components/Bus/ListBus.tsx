import { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Pagination } from "../ui/Pagination";
import { CirclePlus, Pencil } from "lucide-react";
import { apiRequest } from "../../services/api";
import { CreateButton } from "../ui/CreateButton";
import { BusModal } from "./CreateBusModal";
import { ConfirmModal } from "../ui/ConfirmModal";

type AccessibilityFeature = {
    id: number;
    name?: string;
};

export type Bus = {
    id: number;
    model: string;
    brand: string;
    color: string;
    year: number;
    licensePlate: string;
    numberOfSeats: number;
    hasWifi: boolean;
    hasAirConditioning: boolean;
    accessibilityFeatures: AccessibilityFeature[];
};

const ITEMS_PER_PAGE = 10;

export default function ListBus() {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [sortField, setSortField] = useState<"model" | "year">("model");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
    const [busToEdit, setBusToEdit] = useState<Bus | null>(null);

    async function loadBuses() {
        const response = await apiRequest(
            `/buses?page=${currentPage}&size=${ITEMS_PER_PAGE}&sort=${sortField},${sortOrder}`
        );
        const data = await response.json();
        setBuses(data.content ?? []);
        setTotalElements(data.totalElements ?? 0);
        setTotalPages(data.totalPages ?? 0);
    }

    useEffect(() => {
        loadBuses();
    }, [currentPage, sortField, sortOrder]);

    const handleDeleteClick = (id: number) => {
        setSelectedBusId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedBusId === null) return;

        try {
            const response = await apiRequest(`/buses/${selectedBusId}`, {
                method: "DELETE",
            });

            if (response.status === 204) {
                loadBuses();
            } else if (response.status === 404) {
                alert("Ônibus não encontrado.");
            } else {
                alert("Erro ao excluir o ônibus.");
            }
        } catch (err) {
            console.error("Erro ao excluir ônibus:", err);
            alert("Não foi possível excluir o ônibus. Verifique se o backend está ativo.");
        } finally {
            setIsConfirmOpen(false);
            setSelectedBusId(null);
        }
    };

    const handleEditClick = async (id: number) => {
        try {
            const response = await apiRequest(`/buses/${id}`);
            const data = await response.json();
            setBusToEdit(data);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Erro ao buscar ônibus:", err);
            alert("Não foi possível carregar os dados do ônibus.");
        }
    };

    const handleModalSubmit = async (bus: any) => {
        try {
            if (busToEdit) {
                await apiRequest(`/buses/${busToEdit.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bus),
                });
            } else {
                await apiRequest("/buses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bus),
                });
            }
            loadBuses();
            setIsModalOpen(false);
            setBusToEdit(null);
        } catch (err) {
            console.error("Erro ao salvar ônibus:", err);
            alert("Não foi possível salvar o ônibus.");
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-title text-secondary-color">
                        Listagem de Ônibus
                    </h1>

                    <CreateButton
                        type="submit"
                        label="Cadastrar"
                        icon={<CirclePlus size={20} className="text-white" />}
                        onClick={() => {
                            setBusToEdit(null);
                            setIsModalOpen(true);
                        }}
                    />
                </header>

                <div className="flex gap-2 mb-4 items-center">
                    <span className="font-default text-neutral-60">Ordenar por:</span>

                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as "model" | "year")}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="model">Modelo</option>
                        <option value="year">Ano</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="asc">Crescente</option>
                        <option value="desc">Decrescente</option>
                    </select>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    {buses.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-60 text-lg">Nenhum ônibus encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-neutral-20">
                                        <th className="text-left py-4 px-4 font-title text-title">
                                            Modelo
                                        </th>
                                        <th className="text-left py-4 px-4 font-title text-title">
                                            Ano
                                        </th>
                                        <th className="text-left py-4 px-4 font-title text-title">
                                            Acessibilidades
                                        </th>
                                        <th className="text-left py-4 px-4 font-title text-title">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {buses.map((bus) => (
                                        <tr key={bus.id} className="border-b">
                                            <td className="py-4 px-4">{bus.model}</td>
                                            <td className="py-4 px-4">{bus.year}</td>
                                            <td className="py-4 px-4">
                                                {bus.accessibilityFeatures?.length ?? 0}
                                            </td>
                                            <td className="py-4 px-4 flex gap-3">
                                                <button
                                                    onClick={() => handleEditClick(bus.id)}
                                                    className="text-blue-10 hover:underline cursor-pointer flex items-center gap-1"
                                                >
                                                    <Pencil size={16} /> Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(bus.id)}
                                                    className="text-alert hover:underline cursor-pointer"
                                                >
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-3">
                                <p className="text-neutral-60 text-sm font-default">
                                    Mostrando {buses.length} ônibus
                                </p>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalElements={totalElements}
                                    onPageChange={(page) => {
                                        setCurrentPage(page);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Deseja realmente excluir este ônibus?"
            />

            <BusModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                busToEdit={busToEdit ?? undefined}
            />
        </Layout>
    );
}
