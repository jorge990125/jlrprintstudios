import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Printer,
  Image,
  FileText,
  BookOpen,
  Clock,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JLR PrintStudios | Impresión profesional" },
      {
        name: "description",
        content:
          "Impresión profesional de fotos y documentos en JLR PrintStudios. Calidad, rapidez y precios competitivos.",
      },
      { property: "og:title", content: "JLR PrintStudios | Impresión profesional" },
      {
        property: "og:description",
        content:
          "Impresión profesional de fotos y documentos en JLR PrintStudios. Calidad, rapidez y precios competitivos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Image,
    title: "Impresión de fotos",
    description: "Fotos de alta calidad en múltiples tamaños y acabados.",
  },
  {
    icon: FileText,
    title: "Documentos",
    description: "Impresión a color y blanco/negro para tus documentos.",
  },
  {
    icon: Printer,
    title: "Grandes formatos",
    description: "Pósters, carteles y planos hasta tamaños profesionales.",
  },
  {
    icon: BookOpen,
    title: "Encuadernación",
    description: "Encuadernación en espiral, tapa dura y grapado.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Rápido",
    description: "Entrega express disponible en 24-48 horas.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    description: "Materiales premium y control de color profesional.",
  },
  {
    icon: Truck,
    title: "Envío a domicilio",
    description: "Recibe tu pedido donde quieras o recógelo en tienda.",
  },
];

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 py-24 text-background sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-brand-l-yellow blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Impresión profesional para tus mejores proyectos
            </h1>
            <p className="mt-6 text-lg text-background/80 sm:text-xl">
              En JLR Print Studios transformamos tus fotos y documentos en
              impresiones de alta calidad. Rápido, fácil y con resultados
              profesionales.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/pedido"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Hacer un pedido
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center rounded-md border border-background/20 bg-background/10 px-6 py-3 text-base font-medium text-background backdrop-blur transition-colors hover:bg-background/20"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nuestros servicios
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Todo lo que necesitas para imprimir fotos y documentos
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ¿Por qué elegir JLR Print Studios?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Nos comprometemos con la calidad y la satisfacción de nuestros
                clientes. Cada pedido recibe atención personalizada.
              </p>
              <div className="mt-8">
                <Link
                  to="/precios"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Ver precios
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para imprimir?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Sube tus archivos y recibe tu presupuesto en minutos.
          </p>
          <div className="mt-8">
            <Link
              to="/pedido"
              className="inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-background/90"
            >
              Empezar pedido
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
