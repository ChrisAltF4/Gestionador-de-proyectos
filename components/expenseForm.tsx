"use client";

import { useState } from "react";

type Props = {
  rubros: string[];
  onSubmit: (rubro: string, monto: number) => void;
};

export default function ExpenseForm({ rubros, onSubmit }: Props) {
  const [rubro, setRubro] = useState(rubros[0]);
  const [monto, setMonto] = useState("");

  function enviar() {
    const valor = Number(monto);
    if (!valor || valor <= 0) return;
    onSubmit(rubro, valor);
    setMonto("");
  }

  return (
    <div className="flex gap-2">
      <select value={rubro} onChange={(e) => setRubro(e.target.value)} className="rounded border p-2">
        {rubros.map((r) => <option key={r}>{r}</option>)}
      </select>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto en COP"
        className="rounded border p-2"
      />
      <button onClick={enviar} className="rounded bg-blue-700 px-4 py-2 text-white">
        Registrar gasto
      </button>
    </div>
  );
}