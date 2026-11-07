export const RUBROS = [
  "Personal",
  "Equipos",
  "Software/Licencias",
  "Servicios externos",
  "Viáticos",
  "Capacitación",
  "Imprevistos",
] as const;

export type Rubro = (typeof RUBROS)[number];
export type Estado = "Activo" | "En riesgo" | "Finalizado";
export type Nivel = "normal" | "alerta" | "sobre";

export interface Gasto {
  id: string;
  rubro: Rubro;
  monto: number;
  fecha: string;
  descripcion: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  responsable: string;
  estado: Estado;
  presupuestos: Record<Rubro, number>;
  gastos: Gasto[];
}