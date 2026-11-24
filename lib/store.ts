"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { proyectosIniciales } from "./faker-data";
import { Gasto, Proyecto } from "./types";

interface Store {
  proyectos: Proyecto[];
  agregarProyecto: (datos: Omit<Proyecto, "id" | "gastos">) => void;
  editarProyecto: (id: string, datos: Partial<Omit<Proyecto, "id">>) => void;
  eliminarProyecto: (id: string) => void;
  registrarGasto: (id: string, gasto: Omit<Gasto, "id">) => void;
  restablecer: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      proyectos: proyectosIniciales,

      agregarProyecto: (datos) =>
        set((s) => ({
          proyectos: [{ ...datos, id: `p${Date.now()}`, gastos: [] }, ...s.proyectos],
        })),

      editarProyecto: (id, datos) =>
        set((s) => ({
          proyectos: s.proyectos.map((p) => (p.id === id ? { ...p, ...datos } : p)),
        })),

      eliminarProyecto: (id) =>
        set((s) => ({ proyectos: s.proyectos.filter((p) => p.id !== id) })),

      registrarGasto: (id, gasto) =>
        set((s) => ({
          proyectos: s.proyectos.map((p) =>
            p.id === id
              ? { ...p, gastos: [...p.gastos, { ...gasto, id: `g${Date.now()}` }] }
              : p
          ),
        })),

      // Vuelve a los datos de Faker y sobrescribe lo guardado
      restablecer: () => set({ proyectos: proyectosIniciales }),
    }),
    {
      name: "gestorpro-store", // clave en localStorage
      version: 1, // súbelo (2, 3...) si cambias la forma de los datos
      partialize: (s) => ({ proyectos: s.proyectos }), // guarda solo los datos, no las funciones
      skipHydration: true, // se carga a mano en StoreHydration (evita errores de hidratación)
    }
  )
);