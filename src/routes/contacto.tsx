import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | JLR PrintStudios" },
      {
        name: "description",
        content:
          "Contacta con JLR PrintStudios. Estamos aquí para ayudarte con tus proyectos de impresión.",
      },
      { property: "og:title", content: "Contacto | JLR PrintStudios" },
      {
        property: "og:description",
        content:
          "Contacta con JLR PrintStudios. Estamos aquí para ayudarte con tus proyectos de impresión.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactInput) => {
    // En una web estática sin backend, abrimos el cliente de correo del usuario
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nAsunto: ${data.subject}\n\nMensaje:\n${data.message}`
    );
    window.location.href = `mailto:jorgeluisramirezlorenzo@gmail.com?subject=${encodeURIComponent(
      data.subject
    )}&body=${body}`;
  };

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes dudas? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Envíanos un mensaje
            </h2>
            {isSubmitSuccessful ? (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-foreground">
                <p className="font-medium">¡Mensaje preparado!</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Se ha abierto tu cliente de correo. Si no se abre, escríbenos
                  directamente a jorgeluisramirezlorenzo@gmail.com.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-foreground"
                  >
                    Nombre
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
                    className="mb-1 block text-sm font-medium text-foreground"
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

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-foreground"
                  >
                    Asunto
                  </label>
                  <input
                    id="subject"
                    {...register("subject")}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="¿Sobre qué nos escribes?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-foreground"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Cuéntanos qué necesitas..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Información de contacto
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+34 600 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="text-muted-foreground">hola@jlrprintstudios.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Dirección</h3>
                  <p className="text-muted-foreground">
                    Calle Ejemplo 123, 28001 Madrid
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/50 p-6">
              <h3 className="mb-2 font-semibold text-foreground">Horario</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Lunes - Viernes</span>
                  <span>9:00 - 19:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábados</span>
                  <span>10:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
