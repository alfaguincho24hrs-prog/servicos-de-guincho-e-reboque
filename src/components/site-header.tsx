import { Link } from "@tanstack/react-router";
import { Phone, Truck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "./site-data";

const SERVICE_LINKS = [
  { to: "/guincho-leve", label: "Guincho Leve" },
  { to: "/guincho-pesado", label: "Guincho Pesado" },
  { to: "/guincho-de-motos", label: "Guincho de Motos" },
  { to: "/auto-socorro", label: "Auto Socorro" },
  { to: "/pane-seca", label: "Pane Seca" },
  { to: "/remocao-veicular", label: "Remoção Veicular" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)]">
            <Truck className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">{SITE.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Início</Link>
          <div className="group relative">
            <Link to="/servicos" activeProps={{ className: "text-accent" }} className="inline-flex items-center gap-1 transition-colors hover:text-accent">
              Serviços <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-lg">
                {SERVICE_LINKS.map((s) => (
                  <Link key={s.to} to={s.to} activeProps={{ className: "text-accent bg-muted/50" }} className="block px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-accent">
                    {s.label}
                  </Link>
                ))}
                <Link to="/servicos" className="block border-t border-border/60 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-accent">
                  Ver todos os serviços →
                </Link>
              </div>
            </div>
          </div>
          <Link to="/cobertura" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Cobertura</Link>
          <Link to="/servicos-de-guincho-e-reboque" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Cidades Atendidas</Link>
          <Link to="/anuncie" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Anuncie</Link>
          <Link to="/blog" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Blog</Link>
          <Link to="/contato" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Contato</Link>
        </nav>
        <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-90">
          <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" />{SITE.phone}</a>
        </Button>
      </div>
    </header>
  );
}
