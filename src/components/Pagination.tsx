import React from "react";
import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-50"
      >
        <GrChapterNext className="rotate-180"/>
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-50"
      >
        <GrCaretNext className="rotate-180"/>
      </button>

      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded  text-sm font-medium ${
            currentPage === page
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-50"
      >
        <GrCaretNext/>
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-50"
      >
        <GrChapterNext/>
      </button>
    </div>
  );
};

export default Pagination;
