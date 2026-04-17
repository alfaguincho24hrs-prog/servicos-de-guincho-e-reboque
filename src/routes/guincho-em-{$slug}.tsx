import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCityLocalData } from "@/components/city-neighborhoods";
import {
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Fuel,
  Bike,
  Car,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE } from "@/components/site-data";
import { ALL_CITIES, type City } from "@/components/cities-data";
import { getCityProviders } from "@/components/city-providers";
import { ProviderDirectory } from "@/components/provider-cards";
import { getCityCopy } from "@/components/city-variations";

const SITE_URL = "https://guincho24hrs.com.br";

function findCity(slug: string): City | undefined {
  const normalized = slug.toLowerCase().trim();
  // Match exact slug (e.g. "sao-paulo")
  let city = ALL_CITIES.find((c) => c.slug === normalized);
  if (city) return city;
  // Match slug with UF suffix (e.g. "americana-sp" or "sao-paulo-sp")
  city = ALL_CITIES.find(
    (c) => `${c.slug}-${c.uf.toLowerCase()}` === normalized
  );
  if (city) return city;
  // Match slug where UF prefix is part (fallback)
  const ufMatch = normalized.match(/-([a-z]{2})$/);
  if (ufMatch) {
    const baseSlug = normalized.slice(0, -3);
    const uf = ufMatch[1].toUpperCase();
    city = ALL_CITIES.find((c) => c.slug === baseSlug && c.uf === uf);
    if (city) return city;
    city = ALL_CITIES.find((c) => c.slug === baseSlug);
    if (city) return city;
  }
  return undefined;
}

export const Route = createFileRoute("/guincho-em-{$slug}")({
  loader: ({ params }) => {
    const city = findCity(params.slug);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { city } = loaderData;
    const title = `Guincho em ${city.name} - ${city.uf} | Reboque 24 Horas | ${SITE.name}`;
    const description = `Guincho 24 horas em ${city.name}/${city.uf}. Reboque rápido para carros, motos, caminhões, auto socorro e pane seca. Atendimento imediato em toda ${city.name}.`;
    const url = `${SITE_URL}/guincho-em-${city.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `guincho ${city.name}, reboque ${city.name}, guincho 24 horas ${city.name} ${city.uf}, auto socorro ${city.name}, pane seca ${city.name}, guincho perto de mim ${city.name}`,
        },
        { name: "robots", content: "index, follow" },
        { name: "geo.region", content: `BR-${city.uf}` },
        { name: "geo.placename", content: city.name },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Cidade não encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        Não localizamos esta cidade em nossa cobertura.
      </p>
      <Button asChild className="mt-6">
        <Link to="/servicos-de-guincho-e-reboque">Ver todas as cidades</Link>
      </Button>
    </div>
  ),
  component: CityPage,
});

const SERVICE_ITEMS = [
  { icon: Car, title: "Guincho para carros", desc: "Plataforma hidráulica para veículos de passeio, SUVs e utilitários." },
  { icon: Truck, title: "Guincho pesado", desc: "Resgate de caminhões, ônibus e máquinas com equipamento robusto." },
  { icon: Bike, title: "Guincho de motos", desc: "Transporte seguro com içamento adequado, sem riscos à pintura." },
  { icon: Wrench, title: "Auto socorro mecânico", desc: "Pequenos reparos, troca de pneu e bateria descarregada no local." },
  { icon: Fuel, title: "Pane seca", desc: "Entrega emergencial de combustível na via pública ou rodovia." },
  { icon: ShieldCheck, title: "Remoção veicular", desc: "Retirada de sinistrados, leilões e transportes programados." },
];

function CityPage() {
  const { city } = Route.useLoaderData();
  const telHref = `tel:${SITE.phone.replace(/\D/g, "")}`;
  const url = `${SITE_URL}/guincho-em-${city.slug}-${city.uf.toLowerCase()}`;
  const local = getCityLocalData(`${city.slug}-${city.uf.toLowerCase()}`, city.uf);
  const copy = getCityCopy(city.name, city.uf, city.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: `${SITE.name} - ${city.name}`,
    description: `Guincho e reboque 24 horas em ${city.name}/${city.uf}.`,
    url,
    telephone: SITE.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.uf,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: city.name },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "248",
    },
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/servicos-de-guincho-e-reboque">Cidades</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {city.name} - {city.uf}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <header className="rounded-2xl bg-[image:var(--gradient-hero,linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background))))] p-8 md:p-12">
        <Badge variant="secondary" className="mb-3">
          <MapPin className="mr-1 h-3 w-3" /> {city.name} - {city.uf}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          Guincho 24 Horas em {city.name} - {city.uf}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{copy.heroIntro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
            <a href={telHref}>
              <Phone className="h-4 w-4" /> Ligar para {SITE.phone}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                `Preciso de guincho em ${city.name}/${city.uf}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Atendimento 24h
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" /> Empresas credenciadas
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" /> Nota 4.9/5
          </span>
        </div>
      </header>

      {/* Diretório de prestadores (Cards Ouro + Fantasma) */}
      <ProviderDirectory
        providers={getCityProviders(`${city.slug}-${city.uf.toLowerCase()}`)}
        cityName={city.name}
        cityUf={city.uf}
      />

      {/* Serviços na cidade */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl">{copy.servicesTitle}</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{copy.servicesIntro}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ITEMS.map((s) => (
            <Card key={s.title} className="border-border/60">
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">
                  {s.title} em {city.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bairros e CEPs - SEO local hiper-segmentado */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl">{copy.neighborhoodsTitle}</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Nosso serviço de guincho 24h cobre todos os bairros de {city.name}/{city.uf},
          incluindo região central, zona industrial, bairros residenciais e
          rodovias de acesso. {local.cepRange ? (
            <>Atendemos a faixa de CEP <strong>{local.cepRange}</strong>.</>
          ) : null}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {local.neighborhoods.map((b) => (
            <span
              key={b}
              className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-sm"
            >
              Guincho no {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Não encontrou seu bairro? Atendemos toda a região metropolitana de
          {" "}{city.name}. Ligue agora e confirme a cobertura no seu endereço.
        </p>
      </section>

      {/* Por que escolher */}
      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">{copy.whyTitle}</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Empresas locais credenciadas em {city.name} com motoristas
                experientes e veículos vistoriados.
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Tempo médio de chegada reduzido graças à malha de parceiros
                distribuída por toda a região metropolitana de {city.name}.
              </span>
            </li>
            <li className="flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Frota completa: plataformas leves, asas-delta e guinchos pesados
                para qualquer porte de veículo.
              </span>
            </li>
            <li className="flex gap-3">
              <Star className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Avaliações positivas de clientes atendidos em {city.name}/{city.uf}.
              </span>
            </li>
          </ul>
        </div>
        <Card className="border-border/60 bg-secondary/40">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">Atendimento imediato</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ligue agora e tenha um guincho a caminho em {city.name} em poucos
              minutos. Atendimento 24h, todos os dias, inclusive feriados.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
                <a href={telHref}>
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contato">Solicitar orçamento</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl">{copy.faqTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {copy.faqs.map((f) => (
            <Card key={f.q} className="border-border/60">
              <CardContent className="p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cidades próximas */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Outras cidades atendidas em {city.uf}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_CITIES.filter((c) => c.uf === city.uf && c.slug !== city.slug)
            .slice(0, 12)
            .map((c) => (
              <Link
                key={c.slug}
                to="/guincho-em-{$slug}"
                params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                className="rounded-full border bg-secondary/40 px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Guincho em {c.name}
              </Link>
            ))}
        </div>
        <div className="mt-4">
          <Link
            to="/servicos-de-guincho-e-reboque"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ver todas as cidades atendidas →
          </Link>
        </div>
      </section>

      {/* SEO LONGO — autoridade local */}
      <section className="mt-14 max-w-4xl space-y-5">
        <h2 className="text-2xl font-bold md:text-3xl">{copy.longTitle}</h2>
        <p className="text-muted-foreground leading-relaxed">{copy.longIntro}</p>
        <p className="text-muted-foreground leading-relaxed">
          Nossa central despacha o socorro mais próximo da sua localização em{" "}
          <strong>{city.name}</strong> em poucos minutos, com tempo médio de chegada entre 20 e 40
          minutos em áreas urbanas. Se a pane aconteceu em <strong>rodovia</strong>, descida de
          serra ou estrada vicinal próxima a {city.name}, também temos equipes preparadas com
          sinalização rodoviária completa, freio motor reforçado e operadores experientes em
          condução em aclives e declives. Os bairros mais demandados — como{" "}
          {local.neighborhoods.slice(0, 6).map((b, i, arr) => (
            <span key={b}>
              <strong>{b}</strong>{i < arr.length - 1 ? ", " : ""}
            </span>
          ))} — recebem atendimento prioritário em qualquer horário do dia ou da noite.
        </p>
        <h3 className="text-xl font-bold pt-2">Quando acionar um guincho em {city.name}?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Acidentes de trânsito, colisões, capotamentos, panes elétricas, problemas no câmbio,
          superaquecimento de motor, pneu furado sem estepe, falta de combustível, bateria
          descarregada, chave trancada dentro do carro, embreagem queimada, vazamento de óleo,
          atolamentos em terrenos irregulares e transporte de veículos batidos para oficinas e
          seguradoras — todas essas situações exigem um <strong>guincho profissional em {city.name}</strong>{" "}
          imediatamente. Tentar empurrar ou rebocar de forma improvisada pode causar acidentes
          graves, multas de trânsito e danos ainda maiores ao seu veículo.
        </p>
        <h3 className="text-xl font-bold pt-2">Por que escolher nossa rede em {city.name}/{city.uf}?</h3>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li>✅ <strong>Atendimento 24h, 7 dias por semana</strong>, inclusive feriados e madrugada.</li>
          <li>✅ <strong>Empresas verificadas</strong> com CNPJ ativo, ANTT regularizada e seguro.</li>
          <li>✅ <strong>Orçamento transparente</strong> antes de iniciar o serviço — sem taxa surpresa.</li>
          <li>✅ <strong>Pagamento facilitado</strong>: PIX, dinheiro, cartão e principais aplicativos.</li>
          <li>✅ <strong>Tempo médio de chegada inferior a 40 minutos</strong> em {city.name}.</li>
          <li>✅ <strong>Cobertura completa</strong> em todos os bairros e rodovias de acesso.</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
            <a href={telHref}><Phone className="h-5 w-5" /> Ligar agora — {SITE.phone}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Preciso de guincho em ${city.name}/${city.uf}`)}`} target="_blank" rel="noreferrer">
              WhatsApp 24h
            </a>
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-14 rounded-2xl bg-secondary/50 p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{copy.ctaTitle}</h2>
        <p className="mt-2 text-muted-foreground">
          Não fique parado na estrada. Acione agora e resolva sua emergência com
          rapidez e segurança em {city.name}/{city.uf}.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
            <a href={telHref}>
              <Phone className="h-4 w-4" /> Ligar agora
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contato">Enviar mensagem</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
