import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addProvider,
  getRawCityProviders,
  listProviderCities,
  readAddedProviders,
  readOverrides,
  removeAddedProvider,
  setProviderOverride,
  type Provider,
  type ProviderOverride,
  type ProviderTier,
} from "@/components/city-providers";
import { ALL_CITIES } from "@/components/cities-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  Image as ImageIcon,
  Lock,
  LogOut,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASS = "guincho-admin-2026";
const AUTH_KEY = "admin_session_v1";
const MAX_PHOTOS = 4;

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
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminEditor initialCity={search.city} />;
}

const ALL_CITY_OPTIONS = ALL_CITIES.map((c) => ({
  value: `${c.slug}-${c.uf.toLowerCase()}`,
  label: `${c.name} - ${c.uf}`,
}));

function AdminEditor({ initialCity }: { initialCity: string }) {
  const [city, setCity] = useState(initialCity || ALL_CITY_OPTIONS[0]?.value || "");
  const [tick, setTick] = useState(0);

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
            Crie e edite anunciantes com perfil completo (logo, fotos, contatos e mais).
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

      <ProviderForm
        key={`new-${city}`}
        city={city}
        onSaved={(data) => {
          addProvider(city, {
            name: data.name,
            tier: data.tier,
            area: data.area || undefined,
            whatsapp: data.whatsapp || undefined,
            phoneMasked: data.phoneMasked || undefined,
            phone: data.phone || undefined,
            address: data.address || undefined,
            description: data.description || undefined,
            instagram: data.instagram || undefined,
            website: data.website || undefined,
            verified: data.verified,
            logoUrl: data.logoUrl || undefined,
            photos: data.photos.length ? data.photos : undefined,
          });
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

// ---------- Helpers ----------

async function fileToDataUrl(file: File, maxSizeKB = 400): Promise<string> {
  if (file.size > maxSizeKB * 1024 * 4) {
    throw new Error(`Imagem muito grande (máx ~${maxSizeKB * 4}KB).`);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Falha ao ler imagem"));
    reader.readAsDataURL(file);
  });
}

type FormState = {
  name: string;
  tier: ProviderTier;
  area: string;
  whatsapp: string;
  phoneMasked: string;
  phone: string;
  address: string;
  description: string;
  instagram: string;
  website: string;
  verified: boolean;
  logoUrl: string;
  photos: string[];
};

function emptyForm(): FormState {
  return {
    name: "",
    tier: "bronze",
    area: "",
    whatsapp: "",
    phoneMasked: "",
    phone: "",
    address: "",
    description: "",
    instagram: "",
    website: "",
    verified: false,
    logoUrl: "",
    photos: [],
  };
}

function fromProvider(p: Provider): FormState {
  return {
    name: p.name || "",
    tier: p.tier,
    area: p.area || "",
    whatsapp: p.whatsapp || "",
    phoneMasked: p.phoneMasked || "",
    phone: p.phone || "",
    address: p.address || "",
    description: p.description || "",
    instagram: p.instagram || "",
    website: p.website || "",
    verified: !!p.verified,
    logoUrl: p.logoUrl || "",
    photos: p.photos || [],
  };
}

// ---------- Form (create + inline edit reuse) ----------

function ProviderForm({
  city,
  initial,
  onSaved,
  isEdit,
}: {
  city: string;
  initial?: FormState;
  onSaved: (data: FormState) => void;
  isEdit?: boolean;
}) {
  const [f, setF] = useState<FormState>(initial || emptyForm());
  const logoInput = useRef<HTMLInputElement>(null);
  const photosInput = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  const handleLogo = async (file?: File) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file, 200);
      update("logoUrl", url);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handlePhotos = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - f.photos.length;
    if (remaining <= 0) {
      toast.error(`Máximo de ${MAX_PHOTOS} fotos`);
      return;
    }
    const toAdd: string[] = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      try {
        toAdd.push(await fileToDataUrl(file, 400));
      } catch (e) {
        toast.error((e as Error).message);
      }
    }
    update("photos", [...f.photos, ...toAdd]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = f.name.trim();
    if (!name) return toast.error("Informe o nome do anunciante");
    if (!city) return toast.error("Selecione uma cidade");
    if (f.tier !== "ghost" && !f.whatsapp && !f.phone) {
      return toast.error("Tiers pagos exigem WhatsApp ou Telefone");
    }
    if (f.whatsapp && !/^\d{10,15}$/.test(f.whatsapp)) {
      return toast.error("WhatsApp inválido (apenas dígitos, ex: 5511999999999)");
    }
    if (f.phone && !/^\d{8,15}$/.test(f.phone)) {
      return toast.error("Telefone inválido (apenas dígitos)");
    }

    const data: FormState = { ...f, name };
    onSaved(data);
    if (!isEdit) setF(emptyForm());
  };

  return (
    <Card className={isEdit ? "" : "border-primary/40 bg-primary/5"}>
      <CardContent className="p-4">
        {!isEdit && (
          <div className="mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Adicionar novo anunciante</h2>
          </div>
        )}
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Nome*</label>
            <Input
              value={f.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ex: Guincho XPTO 24h"
              maxLength={120}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Tier*</label>
            <select
              value={f.tier}
              onChange={(e) => update("tier", e.target.value as ProviderTier)}
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
              value={f.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="Ex: Centro, Zona Sul"
              maxLength={200}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Endereço</label>
            <Input
              value={f.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone p/ ligar (apenas dígitos)
            </label>
            <Input
              value={f.phone}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="12999999999"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              WhatsApp (5511999999999)
            </label>
            <Input
              value={f.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="55119XXXXXXXX"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Instagram (URL)</label>
            <Input
              value={f.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              placeholder="https://instagram.com/empresa"
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Site (URL)</label>
            <Input
              value={f.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://empresa.com.br"
              maxLength={200}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">
              Descrição da empresa
            </label>
            <Textarea
              value={f.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Conte sobre a empresa, serviços, anos de experiência..."
              maxLength={600}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone mascarado (ghost)
            </label>
            <Input
              value={f.phoneMasked}
              onChange={(e) => update("phoneMasked", e.target.value)}
              placeholder="(12) 9****-****"
              maxLength={30}
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={f.verified}
                onChange={(e) => update("verified", e.target.checked)}
                className="h-4 w-4"
              />
              <BadgeCheck className="h-4 w-4 text-primary" />
              Selo de verificação
            </label>
          </div>

          {/* Logo */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Logo da empresa</label>
            <div className="flex items-center gap-3">
              {f.logoUrl ? (
                <div className="relative">
                  <img
                    src={f.logoUrl}
                    alt="Logo"
                    className="h-16 w-16 rounded-md border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => update("logoUrl", "")}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-0.5 text-destructive-foreground"
                    aria-label="Remover logo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}
              <input
                ref={logoInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleLogo(e.target.files?.[0])}
              />
              <Button type="button" variant="outline" size="sm" onClick={() => logoInput.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Enviar logo
              </Button>
            </div>
          </div>

          {/* Fotos */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">
              Fotos (até {MAX_PHOTOS})
            </label>
            <div className="flex flex-wrap gap-2">
              {f.photos.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className="h-20 w-20 rounded-md border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "photos",
                        f.photos.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-0.5 text-destructive-foreground"
                    aria-label="Remover foto"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {f.photos.length < MAX_PHOTOS && (
                <>
                  <input
                    ref={photosInput}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      handlePhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => photosInput.current?.click()}
                    className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> {isEdit ? "Salvar alterações" : "Adicionar anunciante"}
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
  onSave: (patch: ProviderOverride) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const tierMeta = TIERS.find((t) => t.value === provider.tier)!;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {provider.logoUrl ? (
              <img src={provider.logoUrl} alt="" className="h-10 w-10 rounded border object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded border bg-muted text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 font-semibold">
                {provider.name}
                {provider.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                {isCustom && (
                  <Badge variant="outline" className="text-[10px]">
                    Adicionado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge className={tierMeta.color + " text-[10px]"}>{tierMeta.label}</Badge>
                {provider.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {provider.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
              {open ? "Fechar" : "Editar"}
            </Button>
            {isCustom && (
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (confirm("Remover este anunciante?")) onRemove();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {open && (
          <div className="mt-4">
            <ProviderForm
              city=""
              isEdit
              initial={fromProvider(provider)}
              onSaved={(data) => {
                onSave({
                  name: data.name,
                  tier: data.tier,
                  area: data.area || undefined,
                  whatsapp: data.whatsapp || undefined,
                  phoneMasked: data.phoneMasked || undefined,
                  phone: data.phone || undefined,
                  address: data.address || undefined,
                  description: data.description || undefined,
                  instagram: data.instagram || undefined,
                  website: data.website || undefined,
                  verified: data.verified,
                  logoUrl: data.logoUrl || undefined,
                  photos: data.photos.length ? data.photos : undefined,
                });
                setOpen(false);
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Bridge: when ProviderForm is used as the "create" form at the top, it needs to call addProvider.
// We override onSaved at that call site:
// (kept here for clarity — see AdminEditor above)
