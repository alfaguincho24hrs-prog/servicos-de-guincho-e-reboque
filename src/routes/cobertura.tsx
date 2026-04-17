import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Star, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PARTNERS, CITIES } from "@/components/site-data";

export const Route = createFileRoute("/cobertura")({
  head: () => ({
    meta: [
      { title: "Cobertura Nacional de Guincho | Cidades Atendidas em Todo o Brasil" },
      { name: "description", content: "Veja todas as capitais e cidades com atendimento de guincho e reboque 24h. Cobertura nacional com empresas parceiras qualificadas em cada região." },
      { property: "og:title", content: "Cobertura Nacional de Guincho 24h" },
      { property: "og:description", content: "Capitais e cidades atendidas em todo o Brasil." },
    ],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">Cobertura</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Atendimento em todo o Brasil</h1>
        <p className="mt-4 text-muted-foreground">
          Operamos com uma rede consolidada de empresas de guincho parceiras em todas as capitais e principais regiões metropolitanas, garantindo socorro rápido onde quer que você esteja.
        </p>
      </div>

      <h2 className="mt-16 text-2xl font-bold">Empresas parceiras em destaque</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((p) => (
          <Card key={p.name} className="border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
            <CardContent className="space-y-3 p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating}
                </div>
              </div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {p.city}</p>
              <Button asChild className="w-full" variant="secondary">
                <a href={`tel:${p.phone.replace(/\D/g, "")}`}><Phone className="h-4 w-4" /> {p.phone}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Capitais atendidas</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {CITIES.map((c) => (
          <span key={c} className="rounded-full border bg-secondary/40 px-4 py-1.5 text-sm">{c}</span>
        ))}
      </div>
    </div>
  );
}
