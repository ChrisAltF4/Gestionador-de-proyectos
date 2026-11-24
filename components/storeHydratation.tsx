"use client";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

// Carga los datos guardados en localStorage cuando la página ya está en el navegador.
// No dibuja nada: solo dispara la carga una vez.
export default function StoreHydration() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  return null;
}