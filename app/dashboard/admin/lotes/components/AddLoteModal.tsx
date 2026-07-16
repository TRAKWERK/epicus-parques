'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Lote {
  numero: string;
  parque: string;
  precio: number;
  estado: 'disponible' | 'vendido' | 'separado' | 'macro';
  disponible: boolean;
  superficie: number;
  ubicacion: string;
}

interface AddLoteModalProps {
  parques: string[];
  onClose: () => void;
  onAdd: (lote: Omit<Lote, 'id' | 'createdAt'>) => void;
}

export default function AddLoteModal({ parques, onClose, onAdd }: AddLoteModalProps) {
  const [formData, setFormData] = useState({
    numero: '',
    parque: '',
    precio: '',
    estado: 'disponible' as const,
    disponible: true,
    superficie: '',
    ubicacion: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.numero.trim()) newErrors.numero = 'El número es requerido';
    if (!formData.parque) newErrors.parque = 'El parque es requerido';
    if (!formData.precio || parseInt(formData.precio) <= 0)
      newErrors.precio = 'El precio debe ser mayor a 0';
    if (!formData.superficie || parseInt(formData.superficie) <= 0)
      newErrors.superficie = 'La superficie debe ser mayor a 0';
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAdd({
      numero: formData.numero.trim(),
      parque: formData.parque,
      precio: parseInt(formData.precio),
      estado: formData.estado,
      disponible: formData.estado === 'disponible',
      superficie: parseInt(formData.superficie),
      ubicacion: formData.ubicacion.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Agregar Nuevo Lote</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Lote *
            </label>
            <input
              type="text"
              placeholder="ej: C226"
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.numero
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors.numero && (
              <p className="text-red-500 text-sm mt-1">{errors.numero}</p>
            )}
          </div>

          {/* Parque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parque *
            </label>
            <select
              value={formData.parque}
              onChange={(e) =>
                setFormData({ ...formData, parque: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.parque
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona parque</option>
              {parques.map((parque) => (
                <option key={parque} value={parque}>
                  {parque}
                </option>
              ))}
            </select>
            {errors.parque && (
              <p className="text-red-500 text-sm mt-1">{errors.parque}</p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio (MXN) *
            </label>
            <input
              type="number"
              placeholder="8500000"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.precio
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors.precio && (
              <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
            )}
          </div>

          {/* Superficie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Superficie (m²) *
            </label>
            <input
              type="number"
              placeholder="2500"
              value={formData.superficie}
              onChange={(e) =>
                setFormData({ ...formData, superficie: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.superficie
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors.superficie && (
              <p className="text-red-500 text-sm mt-1">{errors.superficie}</p>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación *
            </label>
            <input
              type="text"
              placeholder="ej: Zona Centro"
              value={formData.ubicacion}
              onChange={(e) =>
                setFormData({ ...formData, ubicacion: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.ubicacion
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors.ubicacion && (
              <p className="text-red-500 text-sm mt-1">{errors.ubicacion}</p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estado: e.target.value as 'disponible' | 'vendido' | 'separado' | 'macro',
                  disponible: e.target.value === 'disponible',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="disponible">Disponible</option>
              <option value="vendido">Vendido</option>
              <option value="separado">Separado</option>
              <option value="macro">Macro</option>
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-2 p-6 border-t border-gray-200 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Agregar Lote
          </button>
        </div>
      </div>
    </div>
  );
}
