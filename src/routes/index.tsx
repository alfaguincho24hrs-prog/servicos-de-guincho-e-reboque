import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Clock, ShieldCheck, MapPin, Star, ArrowRight, Truck, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE, SERVICES, PARTNERS, CITIES } from "@/components/site-data";
import heroImg from "@/assets/hero-guincho.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guincho 24 Horas em Todo o Brasil | Reboque e Auto Socorro" },
      { name: "description", content: "Precisa de guincho agora? Conectamos você a empresas de reboque 24h na sua cidade. Atendimento rápido para carros, motos e veículos pesados em todo o país." },
      { property: "og:title", content: "Guincho 24 Horas em Todo o Brasil" },
      { property: "og:description", content: "Reboque, auto socorro e remoção veicular 24h em todo o Brasil." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Caminhão guincho atendendo emergência em rodovia ao entardecer" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-90" />
        </div>
        <div className="container relative mx-auto grid gap-10 px-4 py-24 md:grid-cols-2 md:py-36">
          <div className="space-y-6 text-primary-foreground">
            <Badge className="border-accent/40 bg-accent/15 text-accent hover:bg-accent/20">
              <Clock className="h-3 w-3" /> Atendimento 24h · 7 dias por semana
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Guincho e Reboque <span className="bg-[image:var(--gradient-cta)] bg-clip-text text-transparent">24 horas</span> em todo o Brasil
            </h1>
            <p className="max-w-xl text-lg text-primary-foreground/85">
              Conectamos motoristas a empresas de auto socorro qualificadas, com chegada rápida na rodovia ou na cidade. Resgate seu veículo com segurança e tranquilidade.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
                <a href={`tel:${SITE.phone}`}><Phone className="h-5 w-5" /> Solicitar guincho agora</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/cobertura">Ver cidades atendidas <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Empresas verificadas</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Mais de 200 cidades</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-accent" /> Avaliação 4.8/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" className="mb-3">Nossos serviços</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Soluções completas em reboque e auto socorro</h2>
          <p className="mt-3 text-muted-foreground">
            Da pane simples ao resgate de veículos pesados, encontre o serviço ideal para a sua emergência com profissionais experientes.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="group relative overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="space-y-3 p-6">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-3">
          {[
            { icon: Clock, title: "Resposta rápida", text: "Tempo médio de chegada inferior a 40 minutos em áreas urbanas." },
            { icon: ShieldCheck, title: "Segurança garantida", text: "Empresas parceiras verificadas, com seguro e equipamentos certificados." },
            { icon: Zap, title: "Preço transparente", text: "Orçamento informado antes do atendimento, sem taxas surpresa." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-3">Empresas em destaque</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Parceiros qualificados próximos a você</h2>
            <p className="mt-3 text-muted-foreground">
              Selecionamos empresas com tradição, frota completa e excelente reputação em cada região do país.
            </p>
          </div>
          <Button asChild variant="outline"><Link to="/cobertura">Ver todos <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.slice(0, 9).map((p) => (
            <Card key={p.name} className="border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent-foreground">
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
      </section>

      {/* COVERAGE */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 border-accent/40 bg-accent/15 text-accent">Cobertura nacional</Badge>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Atendemos as principais capitais e regiões metropolitanas do Brasil
          </h2>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            {CITIES.map((c) => (
              <span key={c} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ANUNCIE */}
      <section className="container mx-auto px-4 py-20">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div className="space-y-4">
              <Badge className="border-accent/40 bg-accent/15 text-accent">Para empresas de guincho</Badge>
              <h2 className="text-3xl font-bold md:text-4xl">Anuncie sua empresa e receba mais chamados</h2>
              <p className="text-primary-foreground/85">
                Apareça na primeira página dos buscadores, conquiste novos clientes da sua região e amplie sua base de atendimentos com a maior plataforma de guinchos do país.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-95">
                <Link to="/anuncie"><Wrench className="h-5 w-5" /> Quero anunciar</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contato">Falar com consultor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
