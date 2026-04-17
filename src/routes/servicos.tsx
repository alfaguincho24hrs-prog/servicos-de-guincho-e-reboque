import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, SITE } from "@/components/site-data";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de Guincho e Reboque 24h | Guincho Brasil 24h" },
      { name: "description", content: "Conheça todos os serviços de guincho 24 horas: reboque leve, pesado, motos, auto socorro mecânico, pane seca e remoção veicular em todo o Brasil." },
      { property: "og:title", content: "Serviços de Guincho e Reboque 24h" },
      { property: "og:description", content: "Reboque leve, pesado, motos, auto socorro, pane seca e remoção." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">Serviços</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Serviços de guincho 24 horas para qualquer emergência</h1>
        <p className="mt-4 text-muted-foreground">
          Oferecemos uma estrutura completa para resgatar seu veículo, seja na cidade, na estrada ou em locais de difícil acesso. Atendimento rápido, ético e seguro.
        </p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Card key={s.slug} className="border-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <CardContent className="space-y-3 p-6">
              <div className="text-4xl">{s.icon}</div>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <Button asChild variant="link" className="px-0">
                <a href={`tel:${SITE.phone}`}>Solicitar agora <ArrowRight className="h-4 w-4" /></a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-16 rounded-2xl bg-secondary/50 p-10 text-center">
        <h2 className="text-2xl font-bold">Não encontrou o serviço que precisa?</h2>
        <p className="mt-2 text-muted-foreground">Fale com nossa central e encontraremos a melhor solução para o seu caso.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-[image:var(--gradient-cta)] text-primary"><a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> {SITE.phone}</a></Button>
          <Button asChild variant="outline"><Link to="/contato">Enviar mensagem</Link></Button>
        </div>
      </div>
    </div>
  );
}
