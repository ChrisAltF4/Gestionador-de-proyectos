type Color = "azul" | "ambar" | "verde" | "morado";

const estilos: Record<Color, { fondo: string; titulo: string; valor: string }> = {
    azul: { fondo: "bg-blue-50", titulo: "text-blue-600", valor: "text-blue-900" },
    ambar: { fondo: "bg-amber50", titulo: "text-amber-700", valor: "text-amber-900" },
    verde: { fondo: "bg-green-50", titulo: "text-green-700", valor: "text-green-900" },
    morado: { fondo: "bg-purple-50", titulo: "text-purple-600", valor: "text-purple-900" },
};

interface Props {
    titulo: string;
    valor: string;
    color: Color;
}

export default function Kpicard({ titulo, valor, color }: Props) {
    const e = estilos[color];
    return (
        <div className={`rounded-xl p-4 ${e.fondo}`}>
            <p className={`text-xs font-medium ${e.titulo}`}>{titulo}</p>
             <p className={`mt-1 wrap-break-word text-xl font-semibold ${e.valor}`}>{valor}</p>
        </div>
  );
}