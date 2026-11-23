"use client";

import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";

type Rubro = { nombre: string; presupuestado: number; ejecutado: number };

const inicial: Rubro[] = [
  { nombre: "Personal", presupuestado: 200_000_000, ejecutado: 150_000_000 },
  { nombre: "Equipos", presupuestado: 90_000_000, ejecutado: 85_000_000 },
  { nombre: "Viáticos", presupuestado: 30_000_000, ejecutado: 33_000_000 },
];

const peso = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const color = (pct: number) =>
  pct > 100 ? "bg-red-500" : pct >= 85 ? "bg-amber-500" : "bg-green-600";

export default function DetalleProyecto() {
  const [rubros, setRubros] = useState(inicial);

  const presupuesto = rubros.reduce((s, r) => s + r.presupuestado, 0);
  const ejecutado = rubros.reduce((s, r) => s + r.ejecutado, 0);
  const saldo = presupuesto - ejecutado;

  function registrarGasto(nombre: string, monto: number) {
    setRubros((prev) =>
      prev.map((r) => (r.nombre === nombre ? { ...r, ejecutado: r.ejecutado + monto } : r))
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Transformación digital</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-blue-50 p-4 text-blue-900">Presupuesto<br />{peso(presupuesto)}</div>
        <div className="rounded-xl bg-orange-50 p-4 text-orange-900">Ejecutado<br />{peso(ejecutado)}</div>
        <div className="rounded-xl bg-green-50 p-4 text-green-900">Saldo<br />{peso(saldo)}</div>
      </div>

      <ExpenseForm rubros={rubros.map((r) => r.nombre)} onSubmit={registrarGasto} />

      <table className="w-full text-left">
        <thead>
          <tr><th>Rubro</th><th>Presupuestado</th><th>Ejecutado</th><th>Saldo</th><th>Ejecución</th></tr>
        </thead>
        <tbody>
          {rubros.map((r) => {
            const pct = Math.round((r.ejecutado / r.presupuestado) * 100);
            return (
              <tr key={r.nombre}>
                <td>{r.nombre}</td>
                <td>{peso(r.presupuestado)}</td>
                <td>{peso(r.ejecutado)}</td>
                <td>{peso(r.presupuestado - r.ejecutado)}</td>
                <td>
                  {pct}%
                  <div className="h-2 w-full rounded bg-neutral-800">
                    <div className={`h-2 rounded ${color(pct)}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td>Total</td><td>{peso(presupuesto)}</td><td>{peso(ejecutado)}</td><td>{peso(saldo)}</td>
            <td>{Math.round((ejecutado / presupuesto) * 100)}%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}