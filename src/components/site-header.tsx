import { Link } from "@tanstack/react-router";
import { Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "./site-data";

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
          <Link to="/servicos" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Serviços</Link>
          <Link to="/cobertura" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Cobertura</Link>
          <Link to="/servicos-de-guincho-e-reboque" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Cidades A-Z</Link>
          <Link to="/anuncie" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Anuncie</Link>
          <Link to="/contato" activeProps={{ className: "text-accent" }} className="transition-colors hover:text-accent">Contato</Link>
        </nav>
        <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-90">
          <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" />{SITE.phone}</a>
        </Button>
      </div>
    </header>
  );
}
