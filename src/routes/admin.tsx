import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  addProvider,
  getRawCityProviders,
  listProviderCities,
  readAddedProviders,
  readOverrides,
  removeAddedProvider,
  setProviderOverride,
  type Provider,
  type ProviderTier,
} from "@/components/city-providers";
import { ALL_CITIES } from "@/components/cities-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, LogOut, Plus, Save, Trash2 } from "lucide-react";
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

// Lista completa de cidades disponíveis (todas as cidades do site)
const ALL_CITY_OPTIONS = ALL_CITIES.map((c) => ({
  value: `${c.slug}-${c.uf.toLowerCase()}`,
  label: `${c.name} - ${c.uf}`,
}));

function AdminEditor({ initialCity }: { initialCity: string }) {
  const [city, setCity] = useState(initialCity || ALL_CITY_OPTIONS[0]?.value || "");
  const [tick, setTick] = useState(0);

  // Cidades com cadastro (arquivo + adicionadas) — destacadas no topo do select
  const cadastradas = useMemo(() => listProviderCities(), [tick]);

  const providers = useMemo<Provider[]>(() => {
    if (!city) return [];
    const base = getRawCityProviders(city);
    const ov = readOverrides()[city] || {};
    return base.map((p) => (p.id && ov[p.id] ? { ...p, ...ov[p.id] } : p));
  }, [city, tick]);

  const addedIds = useMemo(() => {
    const added = readAddedProviders()[city] || [];
    return new Set(added.map((p) => p.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, tick]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel — Anunciantes</h1>
          <p className="text-sm text-muted-foreground">
            Selecione a cidade, edite ou crie novos anunciantes.
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
          {cadastradas.length > 0 && (
            <optgroup label="Com cadastro próprio">
              {cadastradas.map((c) => {
                const opt = ALL_CITY_OPTIONS.find((o) => o.value === c);
                return (
                  <option key={c} value={c}>
                    {opt?.label || c}
                  </option>
                );
              })}
            </optgroup>
          )}
          <optgroup label="Todas as cidades">
            {ALL_CITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Formulário: criar novo anunciante */}
      <NewProviderForm
        city={city}
        onCreated={() => {
          setTick((t) => t + 1);
          toast.success("Anunciante criado");
        }}
      />

      <h2 className="mb-3 mt-8 text-lg font-semibold">
        Anunciantes desta cidade ({providers.length})
      </h2>

      <div className="space-y-3">
        {providers.map((p) => (
          <ProviderRow
            key={p.id || p.name}
            provider={p}
            isCustom={!!p.id && addedIds.has(p.id)}
            onSave={(patch) => {
              if (!p.id) {
                toast.error("Anunciante sem ID — não pode ser editado.");
                return;
              }
              setProviderOverride(city, p.id, patch);
              setTick((t) => t + 1);
              toast.success("Salvo");
            }}
            onRemove={() => {
              if (!p.id) return;
              removeAddedProvider(city, p.id);
              setTick((t) => t + 1);
              toast.success("Anunciante removido");
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

function NewProviderForm({ city, onCreated }: { city: string; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [tier, setTier] = useState<ProviderTier>("bronze");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneMasked, setPhoneMasked] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return toast.error("Informe o nome do anunciante");
    if (trimmedName.length > 120) return toast.error("Nome muito longo (máx 120)");
    if (!city) return toast.error("Selecione uma cidade");
    if (tier !== "ghost" && !whatsapp) {
      return toast.error("Tiers pagos exigem WhatsApp");
    }
    if (whatsapp && !/^\d{10,15}$/.test(whatsapp)) {
      return toast.error("WhatsApp inválido (apenas dígitos, ex: 5511999999999)");
    }

    addProvider(city, {
      name: trimmedName,
      tier,
      area: area.trim().slice(0, 200) || undefined,
      whatsapp: whatsapp || undefined,
      phoneMasked: phoneMasked.trim().slice(0, 30) || undefined,
    });
    setName("");
    setArea("");
    setWhatsapp("");
    setPhoneMasked("");
    setTier("bronze");
    onCreated();
  };

  return (
    <Card className="border-primary/40 bg-primary/5">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          <h2 className="font-semibold">Adicionar novo anunciante</h2>
        </div>
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Nome*</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Guincho XPTO 24h"
              maxLength={120}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Tier*</label>
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
            <Input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex: Centro, Zona Sul"
              maxLength={200}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              WhatsApp (5511999999999) — obrigatório p/ tiers pagos
            </label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="55119XXXXXXXX"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone mascarado (ghost)
            </label>
            <Input
              value={phoneMasked}
              onChange={(e) => setPhoneMasked(e.target.value)}
              placeholder="(12) 9****-****"
              maxLength={30}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ProviderRow({
  provider,
  isCustom,
  onSave,
  onRemove,
}: {
  provider: Provider;
  isCustom: boolean;
  onSave: (patch: { tier: ProviderTier; whatsapp: string; phoneMasked: string; area: string }) => void;
  onRemove: () => void;
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
          <div className="flex items-center gap-2 font-semibold">
            {provider.name}
            {isCustom && (
              <Badge variant="outline" className="text-[10px]">
                Adicionado
              </Badge>
            )}
          </div>
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
            <Input value={area} onChange={(e) => setArea(e.target.value)} maxLength={200} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              WhatsApp (formato 5511999999999)
            </label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="55119XXXXXXXX"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone mascarado (ghost)
            </label>
            <Input
              value={phoneMasked}
              onChange={(e) => setPhoneMasked(e.target.value)}
              placeholder="(12) 9****-****"
              maxLength={30}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between gap-2">
          {isCustom ? (
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                if (confirm("Remover este anunciante?")) onRemove();
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remover
            </Button>
          ) : (
            <span />
          )}
          <Button size="sm" onClick={() => onSave({ tier, whatsapp, phoneMasked, area })}>
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
