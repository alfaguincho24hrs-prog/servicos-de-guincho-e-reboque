import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  getRawCityProviders,
  listProviderCities,
  readOverrides,
  setProviderOverride,
  type Provider,
  type ProviderTier,
} from "@/components/city-providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, LogOut, Save } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASS = "guincho-admin-2026";
const AUTH_KEY = "admin_session_v1";

export const Route = createFileRoute("/admin")({
  validateSearch: (s: Record<string, unknown>) => ({
    city: typeof s.city === "string" ? s.city : "",
  }),
  head: () => ({
    meta: [
      { title: "Painel Admin — Editar Anunciantes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const search = Route.useSearch();
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  if (!authed) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold">Acesso restrito</h1>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Informe a senha do administrador para editar os anunciantes.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pwd === ADMIN_PASS) {
                  sessionStorage.setItem(AUTH_KEY, "1");
                  setAuthed(true);
                  toast.success("Login realizado");
                } else {
                  toast.error("Senha incorreta");
                }
              }}
              className="space-y-3"
            >
              <Input
                type="password"
                placeholder="Senha"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              As alterações são salvas localmente neste navegador. Para
              persistência multiusuário, ative o backend depois.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminEditor initialCity={search.city} />;
}

function AdminEditor({ initialCity }: { initialCity: string }) {
  const cities = useMemo(() => listProviderCities(), []);
  const [city, setCity] = useState(initialCity || cities[0] || "");
  const [tick, setTick] = useState(0); // força re-render após salvar

  const providers = useMemo<Provider[]>(() => {
    if (!city) return [];
    const base = getRawCityProviders(city);
    const ov = readOverrides()[city] || {};
    return base.map((p) => (p.id && ov[p.id] ? { ...p, ...ov[p.id] } : p));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, tick]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel — Anunciantes</h1>
          <p className="text-sm text-muted-foreground">
            Selecione a cidade e edite tier, telefone e área de cada anunciante.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            sessionStorage.removeItem(AUTH_KEY);
            location.reload();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Cidade</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {cities.length === 0 && <option value="">— sem cidades cadastradas —</option>}
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {initialCity && !cities.includes(initialCity) && (
          <p className="mt-2 text-xs text-muted-foreground">
            Cidade <strong>{initialCity}</strong> usa o pool genérico — adicione
            um cadastro próprio em <code>city-providers.ts</code> para editá-la.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <ProviderRow
            key={p.id || p.name}
            provider={p}
            onSave={(patch) => {
              if (!p.id) {
                toast.error("Anunciante sem ID — não pode ser editado.");
                return;
              }
              setProviderOverride(city, p.id, patch);
              setTick((t) => t + 1);
              toast.success("Salvo");
            }}
          />
        ))}
      </div>
    </div>
  );
}

const TIERS: { value: ProviderTier; label: string; color: string }[] = [
  { value: "ghost", label: "Não pago (Ghost)", color: "bg-muted text-muted-foreground" },
  { value: "bronze", label: "Bronze", color: "bg-amber-700 text-white" },
  { value: "silver", label: "Prata", color: "bg-slate-400 text-white" },
  { value: "gold", label: "Ouro", color: "bg-yellow-500 text-white" },
];

function ProviderRow({
  provider,
  onSave,
}: {
  provider: Provider;
  onSave: (patch: { tier: ProviderTier; whatsapp: string; phoneMasked: string; area: string }) => void;
}) {
  const [tier, setTier] = useState<ProviderTier>(provider.tier);
  const [whatsapp, setWhatsapp] = useState(provider.whatsapp || "");
  const [phoneMasked, setPhoneMasked] = useState(provider.phoneMasked || "");
  const [area, setArea] = useState(provider.area || "");

  const tierMeta = TIERS.find((t) => t.value === tier)!;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="font-semibold">{provider.name}</div>
          <Badge className={tierMeta.color}>{tierMeta.label}</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium">Tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as ProviderTier)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Área / bairros</label>
            <Input value={area} onChange={(e) => setArea(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              WhatsApp (formato 5511999999999) — usado em tiers pagos
            </label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
              placeholder="55119XXXXXXXX"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone mascarado — usado em ghost
            </label>
            <Input
              value={phoneMasked}
              onChange={(e) => setPhoneMasked(e.target.value)}
              placeholder="(12) 9****-****"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => onSave({ tier, whatsapp, phoneMasked, area })}>
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
