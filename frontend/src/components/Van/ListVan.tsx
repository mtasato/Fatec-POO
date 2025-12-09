import { useState, useEffect } from "react";
import { Layout } from "../layout/Layout";
import { Pagination } from "../ui/Pagination";
import { CirclePlus, Pencil } from "lucide-react";
import { apiRequest } from "../../services/api";
import { CreateButton } from "../ui/CreateButton";
import { VanModal } from "./CreateVanModal";
import { ConfirmModal } from "../ui/ConfirmModal";

export type AccessibilityFeature = {
  id: number;
  name?: string;
};

export type Van = {
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

export default function ListVan() {
  const [vans, setVans] = useState<Van[]>([]);
  const [sortField, setSortField] = useState<"brand" | "numberOfSeats">(
    "brand"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedVanId, setSelectedVanId] = useState<number | null>(null);
  const [vanToEdit, setVanToEdit] = useState<Van | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  async function loadVans() {
    try {
      const response = await apiRequest(
        `/vans?page=${currentPage}&size=${ITEMS_PER_PAGE}&sort=${sortField},${sortOrder}&search=${debouncedSearchTerm}`
      );
      const data = await response.json();
      setVans(data.content ?? []);
      setTotalElements(data.totalElements ?? 0);
      setTotalPages(data.totalPages ?? 0);
    } catch (err) {
      console.error("Erro ao carregar vans:", err);
    }
  }

  useEffect(() => {
    loadVans();
  }, [currentPage, sortField, sortOrder, debouncedSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(0);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleDeleteClick = (id: number) => {
    setSelectedVanId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedVanId === null) return;

    try {
      const response = await apiRequest(`/vans/${selectedVanId}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        loadVans();
      } else {
        alert("Erro ao excluir a van.");
      }
    } catch (err) {
      console.error("Erro ao excluir van:", err);
      alert("Não foi possível excluir a van.");
    } finally {
      setIsConfirmOpen(false);
      setSelectedVanId(null);
    }
  };

  const handleEditClick = async (id: number) => {
    try {
      const response = await apiRequest(`/vans/${id}`);
      const data = await response.json();
      setVanToEdit(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao buscar van:", err);
      alert("Não foi possível carregar os dados da van.");
    }
  };

  const handleModalSubmit = async (van: any) => {
    try {
      if (vanToEdit) {
        await apiRequest(`/vans/${vanToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(van),
        });
      } else {
        await apiRequest("/vans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(van),
        });
      }
      loadVans();
      setIsModalOpen(false);
      setVanToEdit(null);
    } catch (err) {
      console.error("Erro ao salvar van:", err);
      alert("Não foi possível salvar a van.");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-title text-secondary-color">
            Listagem de Vans
          </h1>

          <CreateButton
            type="submit"
            label="Cadastrar"
            icon={<CirclePlus size={20} className="text-white" />}
            onClick={() => {
              setVanToEdit(null);
              setIsModalOpen(true);
            }}
          />
        </header>

        <div className="flex gap-2 mb-4 items-center">
          <span className="font-default text-neutral-60">Ordenar por:</span>

          <select
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as "brand" | "numberOfSeats")
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="brand">Marca</option>
            <option value="numberOfSeats">Número de Assentos</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por modelo ou marca"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-64 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {vans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-60 text-lg">Nenhuma van encontrada</p>
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
                      Marca
                    </th>
                    <th className="text-left py-4 px-4 font-title text-title">
                      Assentos
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
                  {vans.map((van) => (
                    <tr key={van.id} className="border-b">
                      <td className="py-4 px-4">{van.model}</td>
                      <td className="py-4 px-4">{van.brand}</td>
                      <td className="py-4 px-4">{van.numberOfSeats}</td>
                      <td className="py-4 px-4">
                        {van.accessibilityFeatures?.length ?? 0}
                      </td>
                      <td className="py-4 px-4 flex gap-3">
                        <button
                          onClick={() => handleEditClick(van.id)}
                          className="text-blue-10 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Pencil size={16} /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(van.id)}
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
                  Mostrando {vans.length} vans
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
        message="Deseja realmente excluir esta van?"
      />

      <VanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        vanToEdit={vanToEdit ?? undefined}
      />
    </Layout>
  );
}
