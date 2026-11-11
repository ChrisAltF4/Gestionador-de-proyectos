import { fakerES as faker } from "@faker-js/faker";
import { Estado, Gasto, Proyecto, RUBROS, Rubro } from "./types";

const NOMBRES = [
  "Transformación digital",
  "Nueva sede Barranquilla",
  "Migración a la nube",
  "Campaña de expansión",
  "Automatización de procesos",
  "Plataforma de clientes",
  "Modernización de redes",
  "Programa de capacitación",
];
const ESTADOS: Estado[] = ["Activo", "Activo", "En riesgo", "Finalizado"];

function generarGastos(proyectoId: string, rubro: Rubro, total: number): Gasto[] {
  const cantidad = faker.number.int({ min: 3, max: 5 });
  const parte = Math.round(total / cantidad / 1000) * 1000;
  const gastos: Gasto[] = [];
  let restante = total;
  for (let i = 0; i < cantidad; i++) {
    const monto = i === cantidad - 1 ? restante : parte;
    restante -= monto;
    gastos.push({
      id: `${proyectoId}-${rubro}-${i}`,
      rubro,
      monto,
      fecha: faker.date.between({ from: "2026-01-01", to: "2026-11-06" }).toISOString(),
      descripcion: faker.commerce.productName(),
    });
  }
  return gastos;
}

export function generarProyectos(): Proyecto[] {
  faker.seed(123);
  return NOMBRES.map((nombre, i) => {
    const id = `p${i + 1}`;
    const presupuestos = {} as Record<Rubro, number>;
    let gastos: Gasto[] = [];
    for (const rubro of RUBROS) {
      const presupuesto = faker.number.int({ min: 5, max: 80 }) * 1_000_000;
      presupuestos[rubro] = presupuesto;
      const ratio = faker.number.float({ min: 0.2, max: 1.1 });
      const ejecutado = Math.round((presupuesto * ratio) / 1000) * 1000;
      gastos = gastos.concat(generarGastos(id, rubro, ejecutado));
    }
    return {
      id,
      nombre,
      responsable: faker.person.fullName(),
      estado: faker.helpers.arrayElement(ESTADOS),
      presupuestos,
      gastos,
    };
  });
}

export const proyectosIniciales = generarProyectos();