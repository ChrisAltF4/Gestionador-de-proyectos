"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { RUBROS, type Estado, type Proyecto, type Rubro } from "@/lib/types";

export type DatosProyecto = Omit<Proyecto, "id" | "gastos">;

const ESTADOS: Estado[] = ["Activo", "En riesgo", "Finalizado"];

type Props = {
  proyecto?: Proyecto | null;
  onSave: (datos: DatosProyecto) => void;
  onClose: () => void;
};

export default function ProjectForm({ proyecto, onSave, onClose }: Props) {
  const [nombre, setNombre] = useState(proyecto?.nombre ?? "");
  const [responsable, setResponsable] = useState(proyecto?.responsable ?? "");
  const [estado, setEstado] = useState<Estado>(proyecto?.estado ?? "Activo");
  const [presupuestos, setPresupuestos] = useState<Record<Rubro, string>>(
    () =>
      Object.fromEntries(
        RUBROS.map((r) => [r, String(proyecto?.presupuestos[r] ?? 0)])
      ) as Record<Rubro, string>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nombre.trim() || !responsable.trim()) return;

    onSave({
      nombre: nombre.trim(),
      responsable: responsable.trim(),
      estado,
      presupuestos: Object.fromEntries(
        RUBROS.map((r) => [r, Number(presupuestos[r]) || 0])
      ) as Record<Rubro, number>,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {proyecto ? "Editar proyecto" : "Nuevo proyecto"}
          </h2>
          <button type="button" onClick={onClose}>
            <X className="text-gray-500" />
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nombre del proyecto
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej. Migración a la nube"
            className="w-full rounded-lg border px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Responsable
          </label>
          <input
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            required
            placeholder="Nombre del responsable"
            className="w-full rounded-lg border px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as Estado)}
            className="w-full rounded-lg border bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Presupuesto por rubro (COP)
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RUBROS.map((rubro) => (
              <div key={rubro}>
                <label className="mb-1 block text-xs text-gray-500">
                  {rubro}
                </label>
                <input
                  type="number"
                  min={0}
                  value={presupuestos[rubro]}
                  onChange={(e) =>
                    setPresupuestos({ ...presupuestos, [rubro]: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2.5 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            {proyecto ? "Guardar cambios" : "Crear proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
}