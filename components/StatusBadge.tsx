type Status = "Activo" | "En riesgo" | "Finalizado";

const styles: Record<Status, string> = {
    Activo: "bg-emerald-50 text-emerald-700",
    "En riesgo": "bg-amber-50 text-amber-700",
    Finalizado: "bg-blue-50 text-blue-700",
};

type StatusBadgeProps = {
    status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}