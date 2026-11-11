import { Nivel, Proyecto, RUBROS } from "./types";

export const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

export function nivel(porcentaje: number): Nivel {
  if (porcentaje > 100) return "sobre";
  if (porcentaje >= 85) return "alerta";
  return "normal";
}

export function resumenRubros(p: Proyecto) {
  return RUBROS.map((rubro) => {
    const presupuesto = p.presupuestos[rubro];
    const ejecutado = p.gastos
      .filter((g) => g.rubro === rubro)
      .reduce((suma, g) => suma + g.monto, 0);
    const porcentaje = presupuesto ? (ejecutado / presupuesto) * 100 : 0;
    return {
      rubro,
      presupuesto,
      ejecutado,
      saldo: presupuesto - ejecutado,
      porcentaje,
      nivel: nivel(porcentaje),
    };
  });
}

export function totalesProyecto(p: Proyecto) {
  const filas = resumenRubros(p);
  const presupuesto = filas.reduce((s, f) => s + f.presupuesto, 0);
  const ejecutado = filas.reduce((s, f) => s + f.ejecutado, 0);
  const porcentaje = presupuesto ? (ejecutado / presupuesto) * 100 : 0;
  return {
    presupuesto,
    ejecutado,
    saldo: presupuesto - ejecutado,
    porcentaje,
    nivel: nivel(porcentaje),
  };
}