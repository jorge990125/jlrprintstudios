import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Image,
  FileText,
  Printer,
  BookOpen,
  Palette,
  ScanLine,
  Sticker,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios | JLR PrintStudios" },
      {
        name: "description",
        content:
          "Descubre todos los servicios de impresión de JLR PrintStudios: fotos, documentos, grandes formatos, encuadernación y más.",
      },
      { property: "og:title", content: "Servicios | JLR PrintStudios" },
      {
        property: "og:description",
        content:
          "Descubre todos los servicios de impresión de JLR PrintStudios: fotos, documentos, grandes formatos, encuadernación y más.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Servicios,
});

const services = [
  {
    icon: Image,
    title: "Impresión de fotos",
    description:
      "Revelado de fotos digitales en tamaños desde 10x15 hasta poster. Papel fotográfico brillante, mate o satinado.",
    features: ["10x15, 13x18, 20x30, poster", "Acabado brillante/mate", "Recorte y ajuste de color"],
  },
  {
    icon: FileText,
    title: "Documentos a color y B/N",
    description:
      "Impresión de documentos para estudios, oficinas y particulares. Desde una copia hasta grandes volúmenes.",
    features: ["A4, A3, oficio", "Doble cara", "Encuadernación opcional"],
  },
  {
    icon: Printer,
    title: "Grandes formatos",
    description:
      "Pósters, carteles, planos y lonas en gran formato. Ideal para eventos, decoración y proyectos arquitectónicos.",
    features: ["Hasta A0 y más", "Papel foto y lonas", "Entrega en tubo"],
  },
  {
    icon: BookOpen,
    title: "Encuadernación",
    description:
      "Dale un acabado profesional a tus documentos con encuadernación en espiral, tapa dura o grapado.",
    features: ["Espiral metálico/plástico", "Tapa dura", "Grapado y plastificado"],
  },
  {
    icon: Palette,
    title: "Diseño e impresión",
    description:
      "Si necesitas ayuda con el diseño, nuestro equipo puede preparar tus archivos para una impresión perfecta.",
    features: ["Retoque básico", "Maquetación", "Preparación de archivos"],
  },
  {
    icon: ScanLine,
    title: "Escaneo y digitalización",
    description:
      "Digitaliza fotos, documentos y planos en alta resolución. Guardamos tus archivos en el formato que necesites.",
    features: ["Alta resolución", "PDF, JPG, PNG", "Envío por email"],
  },
  {
    icon: Sticker,
    title: "Pegatinas y vinilos",
    description:
      "Pegatinas personalizadas y vinilos de corte para decoración, packaging o promociones.",
    features: ["Vinilo de corte", "Pegatinas en hoja", "Resistentes al agua"],
  },
  {
    icon: Calendar,
    title: "Tarjetas y papelería",
    description:
      "Tarjetas de visita, invitaciones, flyers y toda la papelería que necesites para tu negocio o evento.",
    features: ["Tarjetas de visita", "Invitaciones", "Flyers y dípticos"],
  },
];

function Servicios() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Servicios de impresión
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones completas para fotos, documentos y materiales promocionales
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <service.icon className="h-6 w-6" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-card-foreground">
                {service.title}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-card-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            ¿No encuentras lo que buscas? Contáctanos y te damos presupuesto.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/pedido"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Hacer un pedido
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
