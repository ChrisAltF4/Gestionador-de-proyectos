"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatCOP, resumenRubros, totalesProyecto } from "@/lib/utils";
import { RUBROS, type Rubro } from "@/lib/types";
import ExpenseForm from "@/components/expenseForm";
import ProgressBar from "@/components/progressBar";
import StatusBadge from "@/components/statusBadge";

type Aviso = { tipo: "alerta" | "sobre"; texto: string };

const estiloNivel = {
  normal: "text-emerald-700",
  alerta: "text-amber-700",
  sobre: "text-red-700",
} as const;

export default function ProjectDetail() {
  
  const { id } = useParams<{ id: string }>();
  const proyecto = useStore((s) => s.proyectos.find((p) => p.id === id));
  const registrarGasto = useStore((s) => s.registrarGasto);

  const [aviso, setAviso] = useState<Aviso | null>(null);

  if (!proyecto) {
    return (
      <div className="rounded-xl border bg-white p-6 text-zinc-600">
        Proyecto no encontrado.
      </div>
    );
  }

  const filas = resumenRubros(proyecto);
  const totales = totalesProyecto(proyecto);

  function manejarGasto(rubroTexto: string, monto: number) {
    if (!proyecto) return;
    const rubro = rubroTexto as Rubro;

    const gasto = {
      rubro,
      monto,
      fecha: new Date().toISOString(),
      descripcion: "Gasto registrado manualmente",
    };

    const antes = resumenRubros(proyecto).find((f) => f.rubro === rubro)!;
    const despues = resumenRubros({
      ...proyecto,
      gastos: [...proyecto.gastos, { ...gasto, id: "tmp" }],
    }).find((f) => f.rubro === rubro)!;

    registrarGasto(proyecto.id, gasto);

    if (despues.nivel !== "normal" && despues.nivel !== antes.nivel) {
      const pct = Math.round(despues.porcentaje);
      setAviso({
        tipo: despues.nivel,
        texto:
          despues.nivel === "sobre"
            ? `El rubro "${rubro}" está en sobreejecución (${pct}% del presupuesto).`
            : `El rubro "${rubro}" pasó a alerta (${pct}% del presupuesto).`,
      });
    } else {
      setAviso(null);
    }
  }

  return (
    <div className="space-y-6 text-zinc-400">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-zinc-900">{proyecto.nombre}</h1>
        <StatusBadge status={proyecto.estado} />
      </div>
      <p className="text-sm text-zinc-500">Responsable: {proyecto.responsable}</p>

      {aviso && (
        <div
          role="alert"
          className={`flex items-center justify-between rounded-xl border p-4 text-sm ${
            aviso.tipo === "sobre"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          <span>{aviso.texto}</span>
          <button onClick={() => setAviso(null)} className="ml-4 font-medium underline">
            Cerrar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4 text-blue-900">
          Presupuesto
          <br />
          {formatCOP(totales.presupuesto)}
        </div>
        <div className="rounded-xl bg-orange-50 p-4 text-orange-900">
          Ejecutado
          <br />
          {formatCOP(totales.ejecutado)}
        </div>
        <div className="rounded-xl bg-green-50 p-4 text-green-900">
          Saldo
          <br />
          {formatCOP(totales.saldo)}
        </div>
      </div>

      <ExpenseForm rubros={[...RUBROS]} onSubmit={manejarGasto} />

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3">Rubro</th>
              <th className="px-4 py-3">Presupuestado</th>
              <th className="px-4 py-3">Ejecutado</th>
              <th className="px-4 py-3">Saldo</th>
              <th className="px-4 py-3 w-48">Ejecución</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filas.map((f) => (
              <tr key={f.rubro}>
                <td className="px-4 py-3 font-medium text-zinc-900">{f.rubro}</td>
                <td className="px-4 py-3">{formatCOP(f.presupuesto)}</td>
                <td className="px-4 py-3">{formatCOP(f.ejecutado)}</td>
                <td className={`px-4 py-3 ${estiloNivel[f.nivel]}`}>{formatCOP(f.saldo)}</td>
                <td className="px-4 py-3">
                  <ProgressBar percentage={Math.round(f.porcentaje)} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3">{formatCOP(totales.presupuesto)}</td>
              <td className="px-4 py-3">{formatCOP(totales.ejecutado)}</td>
              <td className={`px-4 py-3 ${estiloNivel[totales.nivel]}`}>
                {formatCOP(totales.saldo)}
              </td>
              <td className="px-4 py-3">
                <ProgressBar percentage={Math.round(totales.porcentaje)} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}