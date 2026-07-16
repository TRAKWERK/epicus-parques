'use client';

import { useState, useMemo } from 'react';
import { Download } from 'lucide-react';

type ReportTab = 'ventas' | 'consultas' | 'disponibilidad';

// Real TRAKWERK data
const PARQUES = [
  { id: 1, nombre: 'García II', lotes_totales: 274, lotes_disponibles: 44 },
  { id: 2, nombre: 'Condesa', lotes_totales: 185, lotes_disponibles: 32 },
  { id: 3, nombre: 'Park Industrial', lotes_totales: 125, lotes_disponibles: 12 },
];

const LOTES_VENDIDOS = [
  { id: 'L001', parque: 'García II', precio: 4100, fecha: '2026-06-15', cliente: 'Industrial ABC' },
  { id: 'L002', parque: 'García II', precio: 4100, fecha: '2026-06-18', cliente: 'Textil XYZ' },
  { id: 'L003', parque: 'Condesa', precio: 5200, fecha: '2026-06-20', cliente: 'Logística MX' },
  { id: 'L004', parque: 'García II', precio: 4800, fecha: '2026-07-01', cliente: 'Distribuidora' },
  { id: 'L005', parque: 'Park Industrial', precio: 6500, fecha: '2026-07-05', cliente: 'Manufactura' },
  { id: 'L006', parque: 'Condesa', precio: 5200, fecha: '2026-07-08', cliente: 'Bodega Plus' },
  { id: 'L007', parque: 'García II', precio: 4100, fecha: '2026-07-10', cliente: 'Industrial Plus' },
  { id: 'L008', parque: 'Park Industrial', precio: 6500, fecha: '2026-07-12', cliente: 'Tech Mfg' },
];

const CONSULTAS = [
  { id: 1, parque: 'García II', total_consultas: 45, respuestas: 38, fecha: '2026-07' },
  { id: 2, parque: 'Condesa', total_consultas: 32, respuestas: 28, fecha: '2026-07' },
  { id: 3, parque: 'Park Industrial', total_consultas: 18, respuestas: 15, fecha: '2026-07' },
];

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('ventas');
  const [dateRange, setDateRange] = useState({
    start: '2026-06-01',
    end: '2026-07-15',
  });

  // Filter data by date range
  const filteredVentas = useMemo(() => {
    return LOTES_VENDIDOS.filter(
      (item) =>
        item.fecha >= dateRange.start &&
        item.fecha <= dateRange.end
    );
  }, [dateRange]);

  const ventasStats = useMemo(() => {
    const total = filteredVentas.length;
    const ingresos = filteredVentas.reduce((sum, item) => sum + item.precio, 0);
    const promedio = total > 0 ? Math.round(ingresos / total) : 0;
    return { total, ingresos, promedio };
  }, [filteredVentas]);

  const ventasPorParque = useMemo(() => {
    const grouped = filteredVentas.reduce(
      (acc, item) => {
        const existing = acc.find((p) => p.parque === item.parque);
        if (existing) {
          existing.ventas += 1;
          existing.ingresos += item.precio;
        } else {
          acc.push({ parque: item.parque, ventas: 1, ingresos: item.precio });
        }
        return acc;
      },
      [] as Array<{ parque: string; ventas: number; ingresos: number }>
    );
    return grouped.sort((a, b) => b.ingresos - a.ingresos);
  }, [filteredVentas]);

  const consultasStats = useMemo(() => {
    const total = CONSULTAS.reduce((sum, item) => sum + item.total_consultas, 0);
    const respuestas = CONSULTAS.reduce((sum, item) => sum + item.respuestas, 0);
    const tasa = total > 0 ? Math.round((respuestas / total) * 100) : 0;
    return { total, respuestas, tasa };
  }, []);

  const disponibilidadStats = useMemo(() => {
    const disponibles = PARQUES.reduce((sum, p) => sum + p.lotes_disponibles, 0);
    const totales = PARQUES.reduce((sum, p) => sum + p.lotes_totales, 0);
    const porcentaje = Math.round((disponibles / totales) * 100);
    return { disponibles, totales, porcentaje };
  }, []);

  // Export functions
  const exportCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map((row) =>
        headers.map((header) => {
          const value = row[header];
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Reportes</h1>
          <p className="text-slate-600">Análisis de ventas, consultas y disponibilidad de lotes</p>
        </div>

        {/* Date Range Picker */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fecha inicio
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fecha fin
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {(['ventas', 'consultas', 'disponibilidad'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* VENTAS TAB */}
            {activeTab === 'ventas' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="text-sm font-medium text-green-700 mb-2">Lotes Vendidos</div>
                    <div className="text-3xl font-bold text-green-900">{ventasStats.total}</div>
                    <div className="text-xs text-green-600 mt-2">en período seleccionado</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="text-sm font-medium text-blue-700 mb-2">Ingresos Totales</div>
                    <div className="text-3xl font-bold text-blue-900">
                      ${ventasStats.ingresos.toLocaleString('es-MX')}
                    </div>
                    <div className="text-xs text-blue-600 mt-2">MXN</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="text-sm font-medium text-purple-700 mb-2">Precio Promedio</div>
                    <div className="text-3xl font-bold text-purple-900">
                      ${ventasStats.promedio.toLocaleString('es-MX')}
                    </div>
                    <div className="text-xs text-purple-600 mt-2">por lote</div>
                  </div>
                </div>

                {/* Chart: Ventas por Parque */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Ventas por Parque</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Parque
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Ventas
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Ingresos
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Gráfico
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ventasPorParque.map((item, idx) => (
                          <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {item.parque}
                            </td>
                            <td className="px-4 py-3 text-right text-sm text-slate-600">
                              {item.ventas}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                              ${item.ingresos.toLocaleString('es-MX')}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end">
                                <div
                                  className="h-8 bg-blue-500 rounded"
                                  style={{
                                    width: `${
                                      Math.max(...ventasPorParque.map((p) => p.ingresos)) > 0
                                        ? (item.ingresos /
                                            Math.max(...ventasPorParque.map((p) => p.ingresos))) *
                                          100
                                        : 0
                                    }px`,
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detailed Sales Table */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Detalle de Ventas</h3>
                    <button
                      onClick={() => exportCSV(filteredVentas, 'ventas.csv')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                      <Download size={16} />
                      Exportar CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            ID Lote
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Parque
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Cliente
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Precio
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Fecha
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentas.map((venta) => (
                          <tr key={venta.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {venta.id}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{venta.parque}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{venta.cliente}</td>
                            <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                              ${venta.precio.toLocaleString('es-MX')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{venta.fecha}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CONSULTAS TAB */}
            {activeTab === 'consultas' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                    <div className="text-sm font-medium text-orange-700 mb-2">Total Consultas</div>
                    <div className="text-3xl font-bold text-orange-900">
                      {consultasStats.total}
                    </div>
                    <div className="text-xs text-orange-600 mt-2">en período</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
                    <div className="text-sm font-medium text-emerald-700 mb-2">Respuestas</div>
                    <div className="text-3xl font-bold text-emerald-900">
                      {consultasStats.respuestas}
                    </div>
                    <div className="text-xs text-emerald-600 mt-2">completadas</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                    <div className="text-sm font-medium text-indigo-700 mb-2">Tasa Respuesta</div>
                    <div className="text-3xl font-bold text-indigo-900">{consultasStats.tasa}%</div>
                    <div className="text-xs text-indigo-600 mt-2">efectividad</div>
                  </div>
                </div>

                {/* Chart: Consultas por Parque */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Consultas por Parque</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Parque
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Consultas
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Respuestas
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Tasa
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Gráfico
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {CONSULTAS.map((item) => {
                          const tasa = Math.round((item.respuestas / item.total_consultas) * 100);
                          return (
                            <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                                {item.parque}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-slate-600">
                                {item.total_consultas}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-slate-600">
                                {item.respuestas}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                                {tasa}%
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end">
                                  <div
                                    className="h-8 bg-orange-500 rounded"
                                    style={{ width: `${tasa * 1.5}px` }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => exportCSV(CONSULTAS, 'consultas.csv')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    Exportar CSV
                  </button>
                </div>
              </div>
            )}

            {/* DISPONIBILIDAD TAB */}
            {activeTab === 'disponibilidad' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 border border-cyan-200">
                    <div className="text-sm font-medium text-cyan-700 mb-2">Lotes Disponibles</div>
                    <div className="text-3xl font-bold text-cyan-900">
                      {disponibilidadStats.disponibles}
                    </div>
                    <div className="text-xs text-cyan-600 mt-2">en todos los parques</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-300">
                    <div className="text-sm font-medium text-slate-700 mb-2">Total Lotes</div>
                    <div className="text-3xl font-bold text-slate-900">
                      {disponibilidadStats.totales}
                    </div>
                    <div className="text-xs text-slate-600 mt-2">inventario total</div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-6 border border-rose-200">
                    <div className="text-sm font-medium text-rose-700 mb-2">Disponibilidad</div>
                    <div className="text-3xl font-bold text-rose-900">
                      {disponibilidadStats.porcentaje}%
                    </div>
                    <div className="text-xs text-rose-600 mt-2">capacidad libre</div>
                  </div>
                </div>

                {/* Chart: Disponibilidad por Parque */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Disponibilidad por Parque
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                            Parque
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Total
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Disponibles
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Vendidos
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            % Disponible
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                            Gráfico
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {PARQUES.map((parque) => {
                          const vendidos = parque.lotes_totales - parque.lotes_disponibles;
                          const porcentaje = Math.round(
                            (parque.lotes_disponibles / parque.lotes_totales) * 100
                          );
                          return (
                            <tr key={parque.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                                {parque.nombre}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-slate-600">
                                {parque.lotes_totales}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-green-600">
                                {parque.lotes_disponibles}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                                {vendidos}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                                {porcentaje}%
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1 justify-end">
                                  <div
                                    className="h-8 bg-green-500 rounded"
                                    style={{
                                      width: `${(parque.lotes_disponibles / parque.lotes_totales) * 150}px`,
                                    }}
                                    title="Disponibles"
                                  />
                                  <div
                                    className="h-8 bg-slate-300 rounded"
                                    style={{
                                      width: `${(vendidos / parque.lotes_totales) * 150}px`,
                                    }}
                                    title="Vendidos"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumen Inventario */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumen Inventario</h3>
                  <div className="space-y-3">
                    {PARQUES.map((parque) => {
                      const vendidos = parque.lotes_totales - parque.lotes_disponibles;
                      const porcentaje = Math.round(
                        (parque.lotes_disponibles / parque.lotes_totales) * 100
                      );
                      return (
                        <div key={parque.id} className="space-y-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-900">
                              {parque.nombre}
                            </span>
                            <span className="text-sm font-medium text-slate-600">
                              {parque.lotes_disponibles} / {parque.lotes_totales} ({porcentaje}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-300 rounded-full h-4 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Export Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      exportCSV(
                        PARQUES.map((p) => ({
                          parque: p.nombre,
                          total: p.lotes_totales,
                          disponibles: p.lotes_disponibles,
                          vendidos: p.lotes_totales - p.lotes_disponibles,
                          porcentaje: `${Math.round(
                            (p.lotes_disponibles / p.lotes_totales) * 100
                          )}%`,
                        })),
                        'disponibilidad.csv'
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    Exportar CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
