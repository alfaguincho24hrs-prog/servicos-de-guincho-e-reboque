import { Link } from "@tanstack/react-router";
import { BadgeCheck, Lock, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/components/site-data";
import type { Provider } from "@/components/city-providers";

type Props = {
  providers: Provider[];
  cityName: string;
  cityUf: string;
};

const CENTRAL_TEL = `tel:${SITE.phone.replace(/\D/g, "")}`;
const CENTRAL_WPP = `https://wa.me/${SITE.whatsapp}`;

const TIER_ORDER = { gold: 0, silver: 1, bronze: 2, ghost: 3 } as const;

export function ProviderDirectory({ providers, cityName, cityUf }: Props) {
  const sorted = [...providers].sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
  return (
    <section className="mt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Empresas de guincho em {cityName} - {cityUf}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Resultados de prestadores que atuam em {cityName}. Anunciantes{" "}
            <span className="font-semibold text-primary">Ouro</span>,{" "}
            <span className="font-semibold">Prata</span> e{" "}
            <span className="font-semibold text-amber-700">Bronze</span> têm
            telefone liberado. Demais prestadores foram localizados em fontes
            públicas — solicite o atendimento pela nossa central.
          </p>
        </div>
        <Badge variant="secondary">{providers.length} resultados</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((p, i) => {
          if (p.tier === "ghost") {
            return <GhostCard key={`${p.name}-${i}`} p={p} cityName={cityName} cityUf={cityUf} />;
          }
          return <PaidCard key={`${p.name}-${i}`} p={p} cityName={cityName} />;
        })}
      </div>
    </section>
  );
}

const TIER_STYLE: Record<"gold" | "silver" | "bronze", { border: string; chip: string; label: string }> = {
  gold: {
    border: "border-2 border-yellow-500/80 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.45)]",
    chip: "bg-yellow-500 text-white",
    label: "★ Ouro",
  },
  silver: {
    border: "border-2 border-slate-400/80",
    chip: "bg-slate-400 text-white",
    label: "Prata",
  },
  bronze: {
    border: "border-2 border-amber-700/70",
    chip: "bg-amber-700 text-white",
    label: "Bronze",
  },
};

function PaidCard({ p, cityName }: { p: Provider; cityName: string }) {
  const tier = p.tier as "gold" | "silver" | "bronze";
  const style = TIER_STYLE[tier];
  const wppNumber = p.whatsapp || SITE.whatsapp;
  const wppHref = `https://wa.me/${wppNumber}?text=${encodeURIComponent(
    `Olá! Preciso de guincho em ${cityName} agora.`
  )}`;
  const telHref = p.whatsapp ? `tel:${p.whatsapp}` : CENTRAL_TEL;
  return (
    <Card className={`relative overflow-hidden ${style.border}`}>
      <div className={`absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${style.chip}`}>
        {style.label}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
        </div>
        {p.area && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {p.area}
          </p>
        )}
        {p.rating && (
          <div className="mt-2 flex items-center gap-1 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(p.rating!) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              {p.rating.toFixed(1)} {p.reviews ? `(${p.reviews} avaliações)` : ""}
            </span>
          </div>
        )}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button asChild className="bg-[#25D366] text-white hover:bg-[#1ebe57]">
            <a href={wppHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp Direto
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={telHref}>
              <Phone className="h-4 w-4" /> Ligar
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GhostCard({
  p,
  cityName,
  cityUf,
}: {
  p: Provider;
  cityName: string;
  cityUf: string;
}) {
  const wppHref = `${CENTRAL_WPP}?text=${encodeURIComponent(
    `Preciso de guincho em ${cityName}/${cityUf} agora.`
  )}`;
  return (
    <Card className="border-border/60 bg-muted/30">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight text-foreground/80">
            {p.name}
          </h3>
          <Badge variant="outline" className="shrink-0 text-[10px]">
            Não verificado
          </Badge>
        </div>
        {p.area && (
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {p.area}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-border bg-background/60 px-3 py-2 text-sm">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono tracking-wider text-muted-foreground blur-[2px] select-none">
            {p.phoneMasked ?? "(00) 9****-****"}
          </span>
          <span className="ml-auto text-[10px] uppercase text-muted-foreground">
            Telefone bloqueado
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          <Button asChild className="bg-[image:var(--gradient-cta)] text-primary">
            <a href={wppHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Solicitar Guincho Agora
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/anuncie">
              É o proprietário? Liberar telefone →
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
