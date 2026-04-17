import { Link } from "@tanstack/react-router";
import { Truck, Mail, Phone, MapPin } from "lucide-react";
import { SITE, SERVICES } from "./site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold">
            <Truck className="h-5 w-5 text-accent" />
            <span>{SITE.name}</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            Plataforma nacional que conecta motoristas a empresas de guincho e reboque qualificadas, 24 horas por dia, 7 dias por semana.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Serviços</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}><Link to="/servicos" className="hover:text-accent">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Portal</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/cobertura" className="hover:text-accent">Cobertura nacional</Link></li>
            <li><Link to="/anuncie" className="hover:text-accent">Anuncie sua empresa</Link></li>
            <li><Link to="/contato" className="hover:text-accent">Fale conosco</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Contato</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{SITE.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{SITE.email}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Atendimento em todo o Brasil</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
