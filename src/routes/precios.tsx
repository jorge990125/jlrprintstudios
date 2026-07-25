import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios | JLR PrintStudios" },
      {
        name: "description",
        content:
          "Consulta los precios de impresión de fotos y documentos en JLR PrintStudios. Tarifas claras y competitivas.",
      },
      { property: "og:title", content: "Precios | JLR PrintStudios" },
      {
        property: "og:description",
        content:
          "Consulta los precios de impresión de fotos y documentos en JLR PrintStudios. Tarifas claras y competitivas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Precios,
});

const photoPrices = [
  { size: "10x15 cm", price: "0,25 €", unit: "unidad" },
  { size: "13x18 cm", price: "0,45 €", unit: "unidad" },
  { size: "20x30 cm", price: "2,50 €", unit: "unidad" },
  { size: "30x40 cm", price: "6,00 €", unit: "unidad" },
  { size: "50x70 cm (póster)", price: "12,00 €", unit: "unidad" },
];

const docPrices = [
  { item: "A4 blanco y negro", price: "0,05 €", unit: "página" },
  { item: "A4 color", price: "0,15 €", unit: "página" },
  { item: "A3 blanco y negro", price: "0,10 €", unit: "página" },
  { item: "A3 color", price: "0,30 €", unit: "página" },
  { item: "Doble cara", price: "+0,02 €", unit: "página" },
];

const bindingPrices = [
  { item: "Grapado simple", price: "0,50 €", unit: "unidad" },
  { item: "Espiral plástico", price: "3,00 €", unit: "unidad" },
  { item: "Espiral metálico", price: "4,50 €", unit: "unidad" },
  { item: "Tapa dura", price: "8,00 €", unit: "unidad" },
];

const packs = [
  {
    name: "Básico",
    price: "9,99 €",
    description: "Perfecto para pequeñas impresiones personales",
    features: [
      "20 fotos 10x15",
      "10 páginas A4 a color",
      "Entrega en 48h",
    ],
  },
  {
    name: "Estándar",
    price: "24,99 €",
    description: "Ideal para estudiantes y pequeñas empresas",
    features: [
      "50 fotos 10x15",
      "50 páginas A4 a color",
      "1 encuadernación espiral",
      "Entrega en 24h",
    ],
    popular: true,
  },
  {
    name: "Profesional",
    price: "49,99 €",
    description: "Para volúmenes y proyectos empresariales",
    features: [
      "100 fotos 10x15",
      "150 páginas A4 a color",
      "3 encuadernaciones espiral",
      "Entrega en 24h",
    ],
  },
];

function PriceTable({
  title,
  rows,
  label,
}: {
  title: string;
  rows: { item?: string; size?: string; price: string; unit: string }[];
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-card-foreground">
        {title}
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-2 font-medium">{label}</th>
            <th className="pb-2 font-medium">Precio</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.item || row.size}>
              <td className="py-3 text-card-foreground">
                {row.item || row.size}
              </td>
              <td className="py-3 font-medium text-primary">
                {row.price}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  /{row.unit}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Precios() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tarifas claras
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Precios competitivos para fotos, documentos y mucho más
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PriceTable title="Fotos" rows={photoPrices} label="Tamaño" />
          <PriceTable title="Documentos" rows={docPrices} label="Servicio" />
          <PriceTable
            title="Encuadernación"
            rows={bindingPrices}
            label="Tipo"
          />
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Packs populares
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => (
              <div
                key={pack.name}
                className={`relative rounded-xl border p-6 shadow-sm ${
                  pack.popular
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Más popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-card-foreground">
                  {pack.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pack.description}
                </p>
                <p className="mt-4 text-3xl font-bold text-primary">
                  {pack.price}
                </p>
                <ul className="mt-6 space-y-3">
                  {pack.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-card-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pedido"
                  className={`mt-6 block w-full rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                    pack.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  Elegir pack
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          Los precios son orientativos y pueden variar según volumen o acabados
          especiales. Solicita tu presupuesto personalizado sin compromiso.
        </div>
      </div>
    </div>
  );
}
