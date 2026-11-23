type ProgressBarProps = {
    percentage: number;
};

export default function ProgressBar({ percentage }: ProgressBarProps) {
    const width = Math.min(Math.max(percentage, 0), 100);

    const color =
        percentage > 100
            ? "bg-red-500"
            : percentage >= 85
                ? "bg-amber-500"
                : "bg-emerald-500";

    return (
        <div className="w-full">
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${width}%` }}
               />
            </div>
            <p className="mt-1 text-right text-xs text-zinc-600">
                {percentage}%
            </p>
        </div>
    );
}