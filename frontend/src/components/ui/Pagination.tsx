import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    totalElements?: number;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    pageSize = 10,
    totalElements = 0
}: PaginationProps) => {
    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    const safeTotalPages = totalPages > 0 ? totalPages : (totalElements > 0 ? 1 : 0);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (safeTotalPages === 0) {
            return totalElements > 0 ? [0] : [];
        }

        const pagesToShow = Math.max(safeTotalPages, totalElements > 0 ? 1 : 0);

        if (pagesToShow <= maxVisible) {
            for (let i = 0; i < pagesToShow; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 0; i < 3; i++) pages.push(i);
                pages.push('...');
                pages.push(pagesToShow - 1);
            } else if (currentPage >= pagesToShow - 3) {
                pages.push(0);
                pages.push('...');
                for (let i = pagesToShow - 3; i < pagesToShow; i++) pages.push(i);
            } else {
                pages.push(0);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(pagesToShow - 1);
            }
        }

        return pages;
    };

    const baseBtn =
        "px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

    const smallBtn =
        "px-2 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex justify-between flex-1 sm:hidden">
                <button
                    className={baseBtn}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>

                    <button
                        className={baseBtn}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === safeTotalPages - 1}
                    >
                        Próximo
                    </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startItem}</span> a{' '}
                    <span className="font-medium">{endItem}</span> de{' '}
                    <span className="font-medium">{totalElements}</span> resultados
                </p>

                <div className="flex items-center gap-2">
                    <button
                        className={smallBtn}
                        onClick={() => onPageChange(0)}
                        disabled={currentPage === 0}
                    >
                        <ChevronsLeft size={16} />
                    </button>

                    <button
                        className={smallBtn}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex gap-1">
                        {(() => {
                            const pageNumbers = getPageNumbers();
                            if (pageNumbers.length > 0) {
                                return pageNumbers.map((page, index) =>
                                    page === "..." ? (
                                        <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange(page as number)}
                                            className={`px-3 py-1 text-sm rounded-md transition-colors ${currentPage === page
                                                    ? "bg-primary-600 text-secondary-color"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {(page as number) + 1}
                                        </button>
                                    )
                                );
                            } else if (safeTotalPages > 0) {
                                return (
                                    <button
                                        className="px-3 py-1 text-sm rounded-md bg-primary-600 text-white"
                                        disabled
                                    >
                                        {currentPage + 1}
                                    </button>
                                );
                            }
                            return null;
                        })()}
                    </div>

                    <button
                        className={smallBtn}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === safeTotalPages - 1}
                    >
                        <ChevronRight size={16} />
                    </button>

                    <button
                        className={smallBtn}
                        onClick={() => onPageChange(safeTotalPages - 1)}
                        disabled={currentPage === safeTotalPages - 1}
                    >
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
