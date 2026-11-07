"use client";
import { create } from "zustand";
import { proyectosIniciales } from "./faker-data";
import { Gasto, Proyecto } from "./types";

interface Store {
  proyectos: Proyecto[];
  agregarProyecto: (datos: Omit<Proyecto, "id" | "gastos">) => void;
  editarProyecto: (id: string, datos: Partial<Omit<Proyecto, "id">>) => void;
  eliminarProyecto: (id: string) => void;
  registrarGasto: (id: string, gasto: Omit<Gasto, "id">) => void;
}

export const useStore = create<Store>((set) => ({
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
}));