'use client';

import { useState, useMemo } from 'react';

interface Consultation {
  id: string;
  cliente: string;
  email: string;
  telefono: string;
  parque: string;
  fecha: string;
  estado: 'pendiente' | 'respondida' | 'archivada';
  asunto: string;
  mensaje: string;
  respuesta?: string;
  fechaRespuesta?: string;
}

// Mock data - Reemplazar con datos reales de Supabase
const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: '1',
    cliente: 'Juan Rodríguez',
    email: 'juan@example.com',
    telefono: '81 8460 6294',
    parque: 'TERRA PARK',
    fecha: '2026-07-14',
    estado: 'pendiente',
    asunto: 'Consulta sobre disponibilidad de lotes',
    mensaje: 'Quisiera conocer más sobre los lotes disponibles en el parque, especialmente en la zona de acceso principal.',
  },
  {
    id: '2',
    cliente: 'María González',
    email: 'maria@example.com',
    telefono: '81 1234 5678',
    parque: 'TERRA CONDESA',
    fecha: '2026-07-13',
    estado: 'respondida',
    asunto: 'Consulta sobre servicios e infraestructura',
    mensaje: 'Necesito información sobre los servicios disponibles en el parque.',
    respuesta: 'Le hemos enviado el catálogo completo de lotes y servicios. Por favor, comuníquese con nosotros para una cita.',
    fechaRespuesta: '2026-07-13',
  },
  {
    id: '3',
    cliente: 'Carlos López',
    email: 'carlos@example.com',
    telefono: '81 9876 5432',
    parque: 'TERRA GARCÍA',
    fecha: '2026-07-12',
    estado: 'pendiente',
    asunto: 'Consulta sobre precios y promociones',
    mensaje: 'Cual es el precio actual de los lotes y hay promociones vigentes?',
  },
  {
    id: '4',
    cliente: 'Sofía Martínez',
    email: 'sofia@example.com',
    telefono: '81 5555 5555',
    parque: 'TERRA PARK',
    fecha: '2026-07-10',
    estado: 'respondida',
    asunto: 'Consulta sobre ubicación de lotes',
    mensaje: 'Me interesa un lote en la zona norte del parque.',
    respuesta: 'Tenemos varios lotes disponibles en esa área. Le invitamos a visitarnos.',
    fechaRespuesta: '2026-07-11',
  },
  {
    id: '5',
    cliente: 'Roberto Sánchez',
    email: 'roberto@example.com',
    telefono: '81 4444 4444',
    parque: 'TERRA GARCÍA II',
    fecha: '2026-07-09',
    estado: 'archivada',
    asunto: 'Consulta antigua',
    mensaje: 'Consulta resuelta hace tiempo.',
    respuesta: 'Consulta archivada',
    fechaRespuesta: '2026-06-01',
  },
];

const PARQUES = ['TERRA PARK', 'TERRA CONDESA', 'TERRA GARCÍA', 'TERRA GARCÍA II', 'TERRA MONTERREY'];

export default function ConsultasPage() {
  const [consultations, setConsultations] = useState<Consultation[]>(MOCK_CONSULTATIONS);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Filtros
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [filterParque, setFilterParque] = useState<string>('');
  const [filterFechaDesde, setFilterFechaDesde] = useState<string>('');
  const [filterFechaHasta, setFilterFechaHasta] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrar consultas
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      if (filterEstado && c.estado !== filterEstado) return false;
      if (filterParque && c.parque !== filterParque) return false;
      if (filterFechaDesde && c.fecha < filterFechaDesde) return false;
      if (filterFechaHasta && c.fecha > filterFechaHasta) return false;
      if (
        searchTerm &&
        !c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.telefono.includes(searchTerm)
      ) {
        return false;
      }
      return true;
    });
  }, [consultations, filterEstado, filterParque, filterFechaDesde, filterFechaHasta, searchTerm]);

  // Ver detalles
  const handleViewDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailModal(true);
  };

  // Responder consulta
  const handleOpenResponse = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setResponseText('');
    setShowResponseModal(true);
  };

  // Enviar respuesta
  const handleSendResponse = () => {
    if (!selectedConsultation || !responseText.trim()) return;

    setConsultations((prev) =>
      prev.map((c) =>
        c.id === selectedConsultation.id
          ? {
              ...c,
              estado: 'respondida' as const,
              respuesta: responseText,
              fechaRespuesta: new Date().toISOString().split('T')[0],
            }
          : c
      )
    );

    setShowResponseModal(false);
    setResponseText('');
    setSelectedConsultation(null);
  };

  // Exportar a CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Cliente', 'Email', 'Teléfono', 'Parque', 'Fecha', 'Estado', 'Asunto'];
    const rows = filteredConsultations.map((c) => [
      c.id,
      c.cliente,
      c.email,
      c.telefono,
      c.parque,
      c.fecha,
      c.estado,
      c.asunto,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultas-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilterEstado('');
    setFilterParque('');
    setFilterFechaDesde('');
    setFilterFechaHasta('');
    setSearchTerm('');
  };

  const estadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'respondida':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'archivada':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const estadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-4 h-4" />;
      case 'respondida':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'archivada':
        return null;
      default:
        return null;
    }
  };

  const stats = {
    total: consultations.length,
    pendientes: consultations.filter((c) => c.estado === 'pendiente').length,
    respondidas: consultations.filter((c) => c.estado === 'respondida').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Consultas de Clientes</h1>
          <p className="text-slate-600">Gestiona todas las consultas e inquiries de clientes potenciales</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-600">Total Consultas</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="text-sm font-medium text-yellow-600 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Pendientes
            </div>
            <div className="text-2xl font-bold text-yellow-700 mt-1">{stats.pendientes}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="text-sm font-medium text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Respondidas
            </div>
            <div className="text-2xl font-bold text-green-700 mt-1">{stats.respondidas}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Buscar por cliente, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-1 md:col-span-2 lg:col-span-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Estado */}
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="respondida">Respondida</option>
              <option value="archivada">Archivada</option>
            </select>

            {/* Parque */}
            <select
              value={filterParque}
              onChange={(e) => setFilterParque(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los parques</option>
              {PARQUES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Fecha Desde */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={filterFechaDesde}
                onChange={(e) => setFilterFechaDesde(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fecha Hasta */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={filterFechaHasta}
                onChange={(e) => setFilterFechaHasta(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              Limpiar filtros
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Parque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredConsultations.length > 0 ? (
                  filteredConsultations.map((consultation) => (
                    <tr
                      key={consultation.id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {consultation.cliente}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {consultation.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {consultation.telefono}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                          {consultation.parque}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(consultation.fecha).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${estadoColor(consultation.estado)}`}
                          >
                            {estadoIcon(consultation.estado)}
                            {consultation.estado.charAt(0).toUpperCase() +
                              consultation.estado.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewDetail(consultation)}
                            className="px-3 py-1 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
                          </button>
                          {consultation.estado === 'pendiente' && (
                            <button
                              onClick={() => handleOpenResponse(consultation)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                              Responder
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                      No se encontraron consultas que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-slate-600">
          Mostrando {filteredConsultations.length} de {consultations.length} consultas
        </div>
      </div>

      {/* Modal Detalle */}
      {showDetailModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Consulta de {selectedConsultation.cliente}</h2>
                <p className="text-blue-100 text-sm mt-1">{selectedConsultation.asunto}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información de contacto */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">Email</label>
                  <a
                    href={`mailto:${selectedConsultation.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedConsultation.email}
                  </a>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">Teléfono</label>
                  <a
                    href={`tel:${selectedConsultation.telefono}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedConsultation.telefono}
                  </a>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">Parque</label>
                  <p className="text-slate-900">{selectedConsultation.parque}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase">Fecha</label>
                  <p className="text-slate-900">
                    {new Date(selectedConsultation.fecha).toLocaleDateString('es-MX')}
                  </p>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                  Consulta
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                  {selectedConsultation.mensaje}
                </div>
              </div>

              {/* Respuesta */}
              {selectedConsultation.respuesta && (
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                    Respuesta ({new Date(selectedConsultation.fechaRespuesta || '').toLocaleDateString('es-MX')})
                  </label>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                    {selectedConsultation.respuesta}
                  </div>
                </div>
              )}

              {/* Estado */}
              {selectedConsultation.estado === 'pendiente' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span className="text-yellow-800 font-medium">
                    Esta consulta aún no ha sido respondida
                  </span>
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                {selectedConsultation.estado === 'pendiente' && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleOpenResponse(selectedConsultation);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Responder Consulta
                  </button>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Respuesta */}
      {showResponseModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Responder Consulta</h2>
                <p className="text-green-100 text-sm mt-1">De: {selectedConsultation.cliente}</p>
              </div>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-white hover:bg-green-700 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Consulta original */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                  Consulta original
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700">
                  <p className="font-medium mb-2">{selectedConsultation.asunto}</p>
                  <p className="whitespace-pre-wrap text-sm">{selectedConsultation.mensaje}</p>
                </div>
              </div>

              {/* Datos de contacto */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-medium">Respuesta será enviada a:</span>
                  <a
                    href={`mailto:${selectedConsultation.email}`}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {selectedConsultation.email}
                  </a>
                </p>
              </div>

              {/* Respuesta */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase block mb-2">
                  Tu respuesta
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {responseText.length} caracteres
                </p>
              </div>

              {/* Acciones */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleSendResponse}
                  disabled={!responseText.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Enviar Respuesta
                </button>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>

              {/* Nota */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <p className="font-medium mb-1">Nota importante:</p>
                <p>
                  La respuesta será marcada como enviada y se guardará en el registro de la consulta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
