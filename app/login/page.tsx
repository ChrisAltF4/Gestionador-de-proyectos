"use client";

import { useState } from "react";
import { Layers3 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <Layers3 size={24} strokeWidth={1.8} />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                        GestorPro
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Inicia sesión para continuar
                    </p>
                </div>

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                            Correo
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-700"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </main>
    );
}