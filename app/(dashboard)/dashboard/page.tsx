import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";

const projects = [
    {
        id:1,
        name: "Modernización tecnológica",
        status: "Activo" as const,
        progress: 65,
    },
    {
        id:2,
        name: "Mejoramiento de infraestructura",
        status: "En riesgo" as const,
        progress: 85,
    },
    {
        id:3,
        name: "Transformación digital",
        status: "Finalizado" as const,
        progress: 100,
    },
];

export default function DashboardPage() {
    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">
                    Dashboard
                </h1>
                <p className="mt-2 text-zinc-500">
                    Resumen general de los proyectos.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-x1 border border-zinc-200 bg-white p-6">
                    <p className="text-sm text-zinc-500">Total de proyectos</p>
                    <p className="mt-2 text-3xl font-bold">3</p>
                </div>

                <div className="rounded-x1 border border-zinc-200 bg-white p-6">
                    <p className="text-sm text-zinc-500">Proyectos activos</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">1</p>
                </div>

                <div className="rounded-x1 border border-zinc-200 bg-white p-6">
                    <p className="text-sm text-zinc-500">Proyectos en riesgo</p>
                    <p className="mt-2 text-3xl font-bold text-amber-600">1</p>
                </div>
            </div> 

            <div className="rounded-x1 border border-zinc-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-semibold text-zinc-900">
                    Seguimiento de proyectos
                </h2>

                <div className="space-y-6">
                    {projects.map((project) => (
                        <div key={project.id} className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-medium text-zinc-800">
                                    {project.name}
                                </h3>
                                <StatusBadge status={project.status} />
                            </div>

                            <ProgressBar percentage={project.progress} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}