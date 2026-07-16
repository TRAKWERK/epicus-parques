'use client';

import { useState } from 'react';

interface BulkActionsBarProps {
  selectedCount: number;
  onDelete: () => void;
  onChangeStatus: (status: string) => void;
  estados: string[];
}

export default function BulkActionsBar({
  selectedCount,
  onDelete,
  onChangeStatus,
  estados,
}: BulkActionsBarProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
          {selectedCount}
        </div>
        <p className="text-blue-900 font-medium">
          {selectedCount} lote{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Change Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
          >
            ✏️
            Cambiar Estado
            ▼
          </button>

          {showStatusDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
              {estados.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onChangeStatus(status);
                    setShowStatusDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg capitalize text-gray-700 font-medium text-sm"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
        >
          🗑️
          Eliminar
        </button>
      </div>
    </div>
  );
}
