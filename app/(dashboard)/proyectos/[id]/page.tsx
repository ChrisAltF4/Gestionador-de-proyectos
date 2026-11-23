import { proyectosIniciales } from "@/lib/faker-data";
import ProjectDetail from "@/components/projectDetail";

export function generateStaticParams() {
  return proyectosIniciales.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <ProjectDetail />;
}