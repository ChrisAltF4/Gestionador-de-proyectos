"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CircleAlert, TriangleAlert } from "lucide-react";
import KpiCard from "@/components/Kpicard";
import { useStore } from "@/lib/store";
import { formatCOP, resumenRubros, totalesProyecto } from "@/lib/utils";

export default function DashboardPage() {
  const proyectos = useStore((s) => s.proyectos);

  // Totales de cada proyecto
  const totales = proyectos.map((p) => ({ p, ...totalesProyecto(p) }));

  // Totales generales
  const presupuesto = totales.reduce((suma, t) => suma + t.presupuesto, 0);
  const ejecutado = totales.reduce((suma, t) => suma + t.ejecutado, 0);
  const saldo = presupuesto - ejecutado;
  const porcentaje = presupuesto ? (ejecutado / presupuesto) * 100 : 0;
  const activos = proyectos.filter((p) => p.estado === "Activo").length;
  const enRiesgo = proyectos.filter((p) => p.estado === "En riesgo").length;

  // Datos del gráfico (en millones para que los números sean cortos)
  const datosGrafico = totales.map((t) => ({
    nombre: t.p.nombre.length > 14 ? t.p.nombre.slice(0, 14) + "…" : t.p.nombre,
    presupuesto: Math.round(t.presupuesto / 1_000_000),
    ejecutado: Math.round(t.ejecutado / 1_000_000),
  }));

  // Alertas: rubros con 85% o más de ejecución
  const alertas = proyectos
    .flatMap((p) =>
      resumenRubros(p)
        .filter((f) => f.nivel !== "normal")
        .map((f) => ({
          id: `${p.id}-${f.rubro}`,
          proyecto: p.nombre,
          rubro: f.rubro,
          porcentaje: f.porcentaje,
          nivel: f.nivel,
        }))
    )
    .sort((a, b) => b.porcentaje - a.porcentaje);
  const visibles = alertas.slice(0, 6);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Resumen general de todos los proyectos
      </p>

      {/* Tarjetas */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard titulo="Presupuesto total" valor={formatCOP(presupuesto)} color="azul" />
        <KpiCard
          titulo={`Ejecutado · ${porcentaje.toFixed(0)}%`}
          valor={formatCOP(ejecutado)}
          color="ambar"
        />
        <KpiCard titulo="Saldo" valor={formatCOP(saldo)} color="verde" />
        <KpiCard
          titulo="Activos / en riesgo"
          valor={`${activos} / ${enRiesgo}`}
          color="morado"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Gráfico */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 lg:col-span-2">
          <h2 className="mb-3 font-medium">Presupuesto vs. ejecutado (millones)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosGrafico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nombre" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(valor) => `$${valor} M`} />
                <Legend />
                <Bar dataKey="presupuesto" name="Presupuesto" fill="#85B7EB" />
                <Bar dataKey="ejecutado" name="Ejecutado" fill="#185FA5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900">
          <h2 className="mb-3 font-medium">Alertas</h2>
          {visibles.length === 0 ? (
            <p className="text-sm text-zinc-500">Todo en orden</p>
          ) : (
            <div className="flex flex-col gap-2">
              {visibles.map((a) => (
                <div
                  key={a.id}
                  className={`flex gap-2 rounded-lg p-2 text-sm ${
                    a.nivel === "sobre"
                      ? "bg-red-50 text-red-800"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {a.nivel === "sobre" ? (
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  ) : (
                    <TriangleAlert size={16} className="mt-0.5 shrink-0" />
                  )}
                  <span>
                    <strong>{a.rubro}</strong> en {a.proyecto}:{" "}
                    {a.porcentaje.toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          )}
          {alertas.length > visibles.length && (
            <p className="mt-2 text-xs text-zinc-500">
              y {alertas.length - visibles.length} alertas más
            </p>
          )}
        </div>
      </div>
    </div>
  );
}