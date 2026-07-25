import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { orderSchema, type OrderInput } from "@/lib/schemas";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Hacer pedido | JLR PrintStudios" },
      {
        name: "description",
        content:
          "Haz tu pedido de impresión online en JLR PrintStudios. Sube tus archivos y recibe presupuesto.",
      },
      { property: "og:title", content: "Hacer pedido | JLR PrintStudios" },
      {
        property: "og:description",
        content:
          "Haz tu pedido de impresión online en JLR PrintStudios. Sube tus archivos y recibe presupuesto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pedido,
});

const serviceOptions = [
  { value: "photos", label: "Impresión de fotos" },
  { value: "documents", label: "Documentos" },
  { value: "large_format", label: "Grandes formatos" },
  { value: "binding", label: "Encuadernación" },
  { value: "stickers", label: "Pegatinas y vinilos" },
  { value: "stationery", label: "Tarjetas y papelería" },
  { value: "other", label: "Otro" },
];

function Pedido() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: OrderInput) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      let filePath: string | null = null;

      if (file) {
        const fileExt = file.name.split(".").pop() || "";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const uploadPath = `orders/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("order-files")
          .upload(uploadPath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Error al subir el archivo: ${uploadError.message}`);
        }

        filePath = uploadPath;
      }

      const { error: insertError } = await supabase.from("orders").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.serviceType,
        quantity: data.quantity,
        size: data.size || null,
        notes: data.notes || null,
        file_path: filePath,
        status: "pending",
      });

      if (insertError) {
        throw new Error(`Error al guardar el pedido: ${insertError.message}`);
      }

      setSubmitStatus("success");
      reset();
      setFile(null);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ha ocurrido un error inesperado"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hacer un pedido
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Rellena el formulario, sube tus archivos y te contactaremos con el
            presupuesto.
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              ¡Pedido recibido!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hemos recibido tu solicitud. Te contactaremos pronto con el
              presupuesto y los siguientes pasos.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Hacer otro pedido
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Nombre completo
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="+5358160709"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="serviceType"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Tipo de servicio
                </label>
                <select
                  id="serviceType"
                  {...register("serviceType")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.serviceType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Cantidad
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  {...register("quantity")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="mb-1 block text-sm font-medium text-card-foreground"
                >
                  Tamaño / acabado
                </label>
                <input
                  id="size"
                  {...register("size")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Ej: A4, 10x15, mate..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="file"
                className="mb-1 block text-sm font-medium text-card-foreground"
              >
                Archivo
              </label>
              <div className="rounded-md border border-dashed border-input bg-muted/50 p-6 text-center">
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">
                    {file ? file.name : "Haz clic para subir tu archivo"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Máximo 20 MB. PDF, JPG, PNG, TIFF, DOCX...
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-1 block text-sm font-medium text-card-foreground"
              >
                Notas adicionales
              </label>
              <textarea
                id="notes"
                rows={4}
                {...register("notes")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Detalles importantes sobre tu pedido..."
              />
            </div>

            {submitStatus === "error" && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando pedido...
                </>
              ) : (
                "Enviar pedido"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
