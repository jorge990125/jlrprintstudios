import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo className="text-background" />
            <p className="max-w-xs text-sm text-background/80">
              Impresión profesional de fotos y documentos con calidad garantizada.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">
              Enlaces
            </h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link to="/" className="hover:text-background">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-background">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/precios" className="hover:text-background">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/pedido" className="hover:text-background">
                  Hacer pedido
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-background">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+5358160709</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>jorgeluisramirezlorenzo@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>edificio 115, apartamento 5, melilla, rafael Freyre, holguin,cuba</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/60">
          © {new Date().getFullYear()} JLR PrintStudios. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
