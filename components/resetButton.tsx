"use client";
import { RotateCcw } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ResetButton() {
  const restablecer = useStore((s) => s.restablecer);

  function onClick() {
    if (confirm("¿Restablecer los datos iniciales? Se perderán los cambios guardados.")) {
      restablecer();
    }
  }

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100"
    >
      <RotateCcw size={16} />
      Restablecer datos
    </button>
  );
}