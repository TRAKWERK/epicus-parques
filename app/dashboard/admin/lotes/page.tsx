'use client';

import { useState, useMemo } from 'react';
import AddLoteModal from './components/AddLoteModal';
import EditLoteModal from './components/EditLoteModal';
import ViewLoteModal from './components/ViewLoteModal';
import BulkActionsBar from './components/BulkActionsBar';

// Types
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

type SortField = 'numero' | 'precio' | 'parque' | 'estado';
type SortOrder = 'asc' | 'desc';

// Mock data - replace with API calls
const MOCK_LOTES: Lote[] = [
  {
    id: '1',
    numero: 'C226',
    parque: 'Condesa',
    precio: 8500000,
    estado: 'disponible',
    disponible: true,
    superficie: 2500,
    ubicacion: 'Zona Centro',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    numero: 'C230',
    parque: 'Condesa',
    precio: 9200000,
    estado: 'separado',
    disponible: false,
    superficie: 2800,
    ubicacion: 'Zona Centro',
    createdAt: '2026-01-16',
  },
  {
    id: '3',
    numero: '44',
    parque: 'García II',
    precio: 4100000,
    estado: 'disponible',
    disponible: true,
    superficie: 1500,
    ubicacion: 'Zona Industrial',
    createdAt: '2026-02-01',
  },
  {
    id: '4',
    numero: '45',
    parque: 'García II',
    precio: 4800000,
    estado: 'vendido',
    disponible: false,
    superficie: 1600,
    ubicacion: 'Zona Industrial',
    createdAt: '2026-02-02',
  },
];

const PARQUES = ['Condesa', 'García II', 'García III', 'Independencia', 'Monterrey'];
const ESTADOS = ['disponible', 'vendido', 'separado', 'macro'];

export default function LotesPage() {
  const [lotes, setLotes] = useState<Lote[]>(MOCK_LOTES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParque, setSelectedParque] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('numero');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedLotes, setSelectedLotes] = useState<Set<string>>(new Set());
  const itemsPerPage = 20;

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLote, setSelectedLote] = useState<Lote | null>(null);

  // Filter and sort logic
  const filteredLotes = useMemo(() => {
    return lotes
      .filter((lote) => {
        const matchesSearch =
          lote.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lote.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesParque = !selectedParque || lote.parque === selectedParque;
        const matchesEstado = !selectedEstado || lote.estado === selectedEstado;
        const matchesPrice =
          lote.precio >= priceRange.min && lote.precio <= priceRange.max;

        return (
          matchesSearch &&
          matchesParque &&
          matchesEstado &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = (b[sortField] as string).toLowerCase();
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [lotes, searchTerm, selectedParque, selectedEstado, priceRange, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredLotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLotes = filteredLotes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers
  const handleAddLote = (newLote: Omit<Lote, 'id' | 'createdAt'>) => {
    const lote: Lote = {
      ...newLote,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLotes([...lotes, lote]);
    setShowAddModal(false);
  };

  const handleEditLote = (updatedLote: Lote) => {
    setLotes(lotes.map((l) => (l.id === updatedLote.id ? updatedLote : l)));
    setShowEditModal(false);
    setSelectedLote(null);
  };

  const handleDeleteLote = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este lote?')) {
      setLotes(lotes.filter((l) => l.id !== id));
      setSelectedLotes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleSelectLote = (id: string) => {
    setSelectedLotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedLotes.size === paginatedLotes.length) {
      setSelectedLotes(new Set());
    } else {
      setSelectedLotes(new Set(paginatedLotes.map((l) => l.id)));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`¿Eliminar ${selectedLotes.size} lotes?`)) {
      setLotes(lotes.filter((l) => !selectedLotes.has(l.id)));
      setSelectedLotes(new Set());
    }
  };

  const handleBulkChangeStatus = (newStatus: string) => {
    setLotes(
      lotes.map((l) =>
        selectedLotes.has(l.id)
          ? {
              ...l,
              estado: newStatus as Lote['estado'],
              disponible: newStatus === 'disponible',
            }
          : l
      )
    );
    setSelectedLotes(new Set());
  };

  const handleEditClick = (lote: Lote) => {
    setSelectedLote(lote);
    setShowEditModal(true);
  };

  const handleViewClick = (lote: Lote) => {
    setSelectedLote(lote);
    setShowViewModal(true);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedParque('');
    setSelectedEstado('');
    setPriceRange({ min: 0, max: 10000000 });
    setCurrentPage(1);
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administración de Lotes</h1>
          <p className="text-gray-500 mt-1">
            Total: {filteredLotes.length} lotes
            {selectedLotes.size > 0 && ` • ${selectedLotes.size} seleccionados`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕
          Agregar Lote
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedLotes.size > 0 && (
        <BulkActionsBar
          selectedCount={selectedLotes.size}
          onDelete={handleBulkDelete}
          onChangeStatus={handleBulkChangeStatus}
          estados={ESTADOS}
        />
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            🔍
            Filtros
          </h2>
          {(searchTerm ||
            selectedParque ||
            selectedEstado ||
            priceRange.min > 0 ||
            priceRange.max < 10000000) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              🔍
              <input
                type="text"
                placeholder="Número o ubicación..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Parque Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parque
            </label>
            <select
              value={selectedParque}
              onChange={(e) => {
                setSelectedParque(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              {PARQUES.map((parque) => (
                <option key={parque} value={parque}>
                  {parque}
                </option>
              ))}
            </select>
          </div>

          {/* Estado Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range - Min */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio mín.
            </label>
            <input
              type="number"
              min="0"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 });
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Price Range - Max */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio máx.
            </label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange({
                  ...priceRange,
                  max: parseInt(e.target.value) || 10000000,
                });
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedLotes.size > 0 &&
                      selectedLotes.size === paginatedLotes.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th
                  onClick={() => handleSort('numero')}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Número
                    {sortField === 'numero' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('parque')}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Parque
                    {sortField === 'parque' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('precio')}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Precio
                    {sortField === 'precio' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('estado')}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Estado
                    {sortField === 'estado' && (
                      <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Disponible
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {paginatedLotes.length > 0 ? (
                paginatedLotes.map((lote) => (
                  <tr
                    key={lote.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedLotes.has(lote.id)}
                        onChange={() => handleSelectLote(lote.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {lote.numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {lote.parque}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {formatPrice(lote.precio)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getEstadoBadgeColor(
                          lote.estado
                        )}`}
                      >
                        {lote.estado.charAt(0).toUpperCase() +
                          lote.estado.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          lote.disponible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {lote.disponible ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewClick(lote)}
                          title="Ver"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleEditClick(lote)}
                          title="Editar"
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded transition"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteLote(lote.id)}
                          title="Eliminar"
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No se encontraron lotes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a{' '}
            {Math.min(startIndex + itemsPerPage, filteredLotes.length)} de{' '}
            {filteredLotes.length} lotes
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ◀
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Siguiente
              ▶
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddLoteModal
          parques={PARQUES}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddLote}
        />
      )}

      {showEditModal && selectedLote && (
        <EditLoteModal
          lote={selectedLote}
          parques={PARQUES}
          onClose={() => {
            setShowEditModal(false);
            setSelectedLote(null);
          }}
          onEdit={handleEditLote}
        />
      )}

      {showViewModal && selectedLote && (
        <ViewLoteModal
          lote={selectedLote}
          onClose={() => {
            setShowViewModal(false);
            setSelectedLote(null);
          }}
        />
      )}
    </div>
  );
}
