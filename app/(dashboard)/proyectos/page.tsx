"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Pencil, Trash2, FolderKanban } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatCOP, totalesProyecto } from "@/lib/utils";
import type { Estado, Nivel, Proyecto } from "@/lib/types";
import ProjectForm, { type DatosProyecto } from "@/components/projectform";

const estadoStyle: Record<Estado, string> = {
  Activo: "bg-blue-100 text-blue-700",
  "En riesgo": "bg-amber-100 text-amber-700",
  Finalizado: "bg-gray-200 text-gray-700",
};

const nivelStyle: Record<Nivel, string> = {
  normal: "bg-green-100 text-green-700",
  alerta: "bg-amber-100 text-amber-700",
  sobre: "bg-red-100 text-red-700",
};

export default function ProyectosPage() {
  const proyectos = useStore((s) => s.proyectos);
  const agregarProyecto = useStore((s) => s.agregarProyecto);
  const editarProyecto = useStore((s) => s.editarProyecto);
  const eliminarProyecto = useStore((s) => s.eliminarProyecto);

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<"Todos" | Estado>("Todos");
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<Proyecto | null>(null);

  const filtrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return proyectos.filter((p) => {
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(q) ||
        p.responsable.toLowerCase().includes(q);
      const coincideEstado = filtro === "Todos" || p.estado === filtro;
      return coincideBusqueda && coincideEstado;
    });
  }, [proyectos, busqueda, filtro]);

  function abrirForm(proyecto?: Proyecto) {
    setEditando(proyecto ?? null);
    setShowForm(true);
  }

  function cerrarForm() {
    setShowForm(false);
    setEditando(null);
  }

  function guardar(datos: DatosProyecto) {
    if (editando) editarProyecto(editando.id, datos);
    else agregarProyecto(datos);
    cerrarForm();
  }

  function eliminar(p: Proyecto) {
    if (!confirm(`¿Eliminar el proyecto "${p.nombre}"?`)) return;
    eliminarProyecto(p.id);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
            <p className="mt-2 text-gray-500">
              Lista de proyectos y su ejecución presupuestal.
            </p>
          </div>
          <button
            onClick={() => abrirForm()}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={20} />
            Nuevo proyecto
          </button>
        </div>

        {/* Buscador y filtro */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o responsable..."
              className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as "Todos" | Estado)}
            className="rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="En riesgo">En riesgo</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          {filtrados.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <FolderKanban size={45} className="mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-800">
                {proyectos.length === 0
                  ? "Todavía no tienes proyectos"
                  : "No se encontraron proyectos"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {proyectos.length === 0
                  ? "Crea tu primer proyecto para comenzar."
                  : "Prueba con otra búsqueda o filtro."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-sm text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Proyecto</th>
                    <th className="px-6 py-4">Responsable</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Presupuesto</th>
                    <th className="px-6 py-4">Ejecutado</th>
                    <th className="px-6 py-4">Avance</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filtrados.map((p) => {
                    const t = totalesProyecto(p);
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {p.nombre}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {p.responsable}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${estadoStyle[p.estado]}`}
                          >
                            {p.estado}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {formatCOP(t.presupuesto)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {formatCOP(t.ejecutado)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${nivelStyle[t.nivel]}`}
                          >
                            {t.porcentaje.toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              href={`/proyectos/${p.id}`}
                              title="Ver proyecto"
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <Eye size={19} />
                            </Link>
                            <button
                              onClick={() => abrirForm(p)}
                              title="Editar proyecto"
                              className="text-gray-500 hover:text-amber-600"
                            >
                              <Pencil size={19} />
                            </button>
                            <button
                              onClick={() => eliminar(p)}
                              title="Eliminar proyecto"
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 size={19} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <ProjectForm
          proyecto={editando}
          onSave={guardar}
          onClose={cerrarForm}
        />
      )}
    </main>
  );
}