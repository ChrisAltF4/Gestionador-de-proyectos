"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Layers3 } from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Proyectos", href: "/proyectos", icon: FolderKanban },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex w-full flex-col border-b border-zinc-200 bg-white px-4 py-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-8">
            <div className="mb-7 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-x1 bg-violet-100 text-violet-700">
                    <Layers3 size={20} strokeWidth={1.8} />
                </div>

                <div>
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
                        GestorPro
                    </h1>
                    <p className="text-xs text-zinc-500">
                        Gestión de proyectos
                    </p>
                </div>
            </div>

            <nav aria-label="Navegación principal" className="flex flex-col gap-1">
                {navigation.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-x1 px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? "bg-violet-50 text-violet-700"
                                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                            }`}
                        >
                            <Icon size={19} strokeWidth={1.8} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}