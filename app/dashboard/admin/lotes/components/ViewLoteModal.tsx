'use client';

import { X } from 'lucide-react';

interface Lote {
  id: string;
  numero: string;
  parque: string;
  precio: number;
  estado: 'disponible' | 'vendido' | 'separado' | 'macro';
  disponible: boolean;
  superficie: number;
  ubicacion: string;
  createdAt: string;
}

interface ViewLoteModalProps {
  lote: Lote;
  onClose: () => void;
}

export default function ViewLoteModal({ lote, onClose }: ViewLoteModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getEstadoBadgeColor = (estado: string) => {
    const colors: Record<string, string> = {
      disponible: 'bg-green-100 text-green-800',
      vendido: 'bg-red-100 text-red-800',
      separado: 'bg-yellow-100 text-yellow-800',
      macro: 'bg-purple-100 text-purple-800',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Detalles del Lote</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* ID y Número */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">ID</p>
              <p className="text-gray-900 font-semibold mt-1">{lote.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Número</p>
              <p className="text-gray-900 font-semibold mt-1">{lote.numero}</p>
            </div>
          </div>

          {/* Parque */}
          <div>
            <p className="text-sm text-gray-600 font-medium">Parque</p>
            <p className="text-gray-900 font-semibold mt-1">{lote.parque}</p>
          </div>

          {/* Precio */}
          <div>
            <p className="text-sm text-gray-600 font-medium">Precio</p>
            <p className="text-gray-900 font-semibold mt-1 text-lg">
              {formatPrice(lote.precio)}
            </p>
          </div>

          {/* Superficie y Ubicación */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Superficie</p>
              <p className="text-gray-900 font-semibold mt-1">{lote.superficie} m²</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Ubicación</p>
              <p className="text-gray-900 font-semibold mt-1">{lote.ubicacion}</p>
            </div>
          </div>

          {/* Estado y Disponible */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Estado</p>
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getEstadoBadgeColor(
                  lote.estado
                )}`}
              >
                {lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Disponible</p>
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  lote.disponible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {lote.disponible ? 'Sí' : 'No'}
              </span>
            </div>
          </div>

          {/* Fecha de Creación */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-medium">Fecha de Creación</p>
            <p className="text-gray-900 font-semibold mt-1">
              {formatDate(lote.createdAt)}
            </p>
          </div>

          {/* Info Adicional */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              Precio por m²: <span className="font-semibold">
                {formatPrice(Math.round(lote.precio / lote.superficie))}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
