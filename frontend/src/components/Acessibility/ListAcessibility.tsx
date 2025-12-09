import { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Pagination } from "../ui/Pagination";
import { CirclePlus, Pencil } from "lucide-react";
import { apiRequest } from "../../services/api";
import { CreateButton } from "../ui/CreateButton";
import { ConfirmModal } from "../ui/ConfirmModal";
import { AccessibilityFeatureModal } from "./CreateAcessbilityModal";

export type AccessibilityFeature = {
    id: number;
    name: string;
    description: string;
};

const ITEMS_PER_PAGE = 10;

export default function ListAccessibilityFeatures() {
    const [features, setFeatures] = useState<AccessibilityFeature[]>([]);
    const [sortField, setSortField] = useState<"name">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [featureToEdit, setFeatureToEdit] = useState<AccessibilityFeature | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    async function loadFeatures() {
        const response = await apiRequest(`/accessibility-features`);
        const data = await response.json();
        setFeatures(data);
    }


    useEffect(() => {
        loadFeatures();
    }, [currentPage, sortField, sortOrder]);

    const sortedFeatures = [...features].sort((a, b) => {
        if (sortOrder === "asc") return a[sortField].localeCompare(b[sortField]);
        return b[sortField].localeCompare(a[sortField]);
    });

    const paginatedFeatures = sortedFeatures.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(sortedFeatures.length / ITEMS_PER_PAGE);
    const totalElements = sortedFeatures.length;

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedId === null) return;

        try {
            const response = await apiRequest(`/accessibility-features/${selectedId}`, {
                method: "DELETE",
            });

            if (response.status === 204) {
                loadFeatures();
            } else {
                alert("Erro ao excluir a feature.");
            }
        } catch (err) {
            alert("Não foi possível excluir. Verifique o backend.");
        } finally {
            setIsConfirmOpen(false);
            setSelectedId(null);
        }
    };

    const handleEditClick = async (id: number) => {
        try {
            const response = await apiRequest(`/accessibility-features/${id}`);
            const data = await response.json();
            setFeatureToEdit(data);
            setIsModalOpen(true);
        } catch {
            alert("Não foi possível carregar os dados.");
        }
    };

    const handleModalSubmit = async (feature: any) => {
        try {
            if (featureToEdit) {
                await apiRequest(`/accessibility-features/${featureToEdit.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(feature),
                });
            } else {
                await apiRequest("/accessibility-features", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(feature),
                });
            }

            loadFeatures();
            setIsModalOpen(false);
            setFeatureToEdit(null);
        } catch (err) {
            alert("Erro ao salvar feature.");
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-title text-secondary-color">
                        Features de Acessibilidade
                    </h1>

                    <CreateButton
                        label="Cadastrar"
                        icon={<CirclePlus size={20} className="text-white" />}
                        onClick={() => {
                            setFeatureToEdit(null);
                            setIsModalOpen(true);
                        }}
                    />
                </header>

                <div className="flex gap-2 mb-4 items-center">
                    <span className="font-default text-neutral-60">Ordenar por:</span>

                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as "name")}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="name">Nome</option>
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
                    {features.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-60 text-lg">Nenhuma feature encontrada</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-neutral-20">
                                        <th className="text-left py-4 px-4 font-title">Nome</th>
                                        <th className="text-left py-4 px-4 font-title">Descrição</th>
                                        <th className="text-left py-4 px-4 font-title">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedFeatures.map((f) => (
                                        <tr key={f.id} className="border-b">
                                            <td className="py-4 px-4">{f.name}</td>
                                            <td className="py-4 px-4">{f.description}</td>
                                            <td className="py-4 px-4 flex gap-3">
                                                <button
                                                    onClick={() => handleEditClick(f.id)}
                                                    className="text-blue-10 hover:underline cursor-pointer flex items-center gap-1"
                                                >
                                                    <Pencil size={16} /> Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(f.id)}
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
                                    Mostrando {features.length} features
                                </p>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalElements={totalElements}
                                    onPageChange={(p) => {
                                        setCurrentPage(p);
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
                message="Deseja realmente excluir esta feature?"
            />

            <AccessibilityFeatureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                featureToEdit={featureToEdit ?? undefined}
            />
        </Layout>
    );
}
