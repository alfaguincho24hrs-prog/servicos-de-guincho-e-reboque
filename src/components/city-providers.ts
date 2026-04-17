// Diretório de prestadores por cidade (slug-uf).
// Tiers:
//  - "gold"   = parceiro Ouro (telefone real, destaque máximo)
//  - "silver" = parceiro Prata (telefone real, destaque médio)
//  - "bronze" = parceiro Bronze (telefone real, destaque básico)
//  - "ghost"  = não pagante (telefone borrado, CTA central)
//
// Overrides do admin são lidos de localStorage ("admin_provider_overrides_v1").

export type ProviderTier = "gold" | "silver" | "bronze" | "ghost";

export type Provider = {
  id?: string; // chave estável para overrides
  name: string;
  tier: ProviderTier;
  whatsapp?: string; // formato 5511999999999
  phoneMasked?: string; // ex: (12) 9****-****
  area?: string;
  rating?: number;
  reviews?: number;
};

const GENERIC_GHOSTS: Provider[] = [
  { id: "g-estrada-real", name: "Auto Socorro Estrada Real", tier: "ghost", phoneMasked: "9****-****", area: "Centro" },
  { id: "g-sao-cristovao", name: "Reboques São Cristóvão", tier: "ghost", phoneMasked: "9****-****", area: "Zona Norte" },
  { id: "g-express-rod", name: "Guincho Express Rodoviário", tier: "ghost", phoneMasked: "9****-****", area: "Rodovia" },
  { id: "g-tow-24h", name: "Tow Service 24h Local", tier: "ghost", phoneMasked: "9****-****", area: "Zona Sul" },
  { id: "g-aguia-veloz", name: "Reboque Águia Veloz", tier: "ghost", phoneMasked: "9****-****", area: "Zona Leste" },
  { id: "g-pronto-auto", name: "Guincho Pronto Socorro Auto", tier: "ghost", phoneMasked: "9****-****", area: "Zona Oeste" },
];

const CITY_PROVIDERS: Record<string, Provider[]> = {
  "taubate-sp": [
    {
      id: "tau-premium-24h",
      name: "Guincho Taubaté Premium 24h — Parceiro Oficial",
      tier: "gold",
      whatsapp: "5511996451510",
      area: "Centro / Independência / Jardim Eulália / Cobertura total",
      rating: 5,
      reviews: 312,
    },
    { id: "tau-1", name: "Auto Socorro Taubaté 24 Horas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Centro" },
    { id: "tau-2", name: "Guincho Taubaté Reboque", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila São José" },
    { id: "tau-3", name: "Reboque Vale do Paraíba Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Quiririm" },
    { id: "tau-4", name: "Guincho Estrada Real Taubaté", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Rod. Pres. Dutra km 117" },
    { id: "tau-5", name: "Pronto Socorro Veicular Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Bonfim" },
    { id: "tau-6", name: "Reboque Cidade Jardim Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim das Nações" },
    { id: "tau-7", name: "Guincho e Reboque Independência", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Independência" },
    { id: "tau-8", name: "Auto Socorro Vale Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Esplanada Santa Terezinha" },
    { id: "tau-9", name: "Reboque Taubaté Express", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Eulália" },
    { id: "tau-10", name: "Guincho Plataforma Taubaté SP", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Parque São Luís" },
    { id: "tau-11", name: "Auto Socorro Oswaldo Cruz", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Oswaldo Cruz" },
    { id: "tau-12", name: "Reboque 24h Taubaté Centro", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Centro Histórico" },
    { id: "tau-13", name: "Guincho Pesado Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Distrito Industrial" },
    { id: "tau-14", name: "Guincho de Motos Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila Marli" },
    { id: "tau-15", name: "Auto Socorro Dutra Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Dutra" },
    { id: "tau-16", name: "Reboque Jardim Russi", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Russi" },
    { id: "tau-17", name: "Guincho São Gonçalo Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "São Gonçalo" },
    { id: "tau-18", name: "Pane Seca Taubaté 24h", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Toda a cidade" },
    { id: "tau-19", name: "Reboque Granjas Reunidas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Granjas Reunidas" },
    { id: "tau-20", name: "Guincho Chácara do Visconde", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Chácara do Visconde" },
  ],
};

// ---------- Overrides via localStorage (admin) ----------

export type ProviderOverride = {
  tier?: ProviderTier;
  whatsapp?: string;
  phoneMasked?: string;
  name?: string;
  area?: string;
};

export type AdminOverrides = Record<string, Record<string, ProviderOverride>>;
// formato: { [citySlug]: { [providerId]: override } }

const STORAGE_KEY = "admin_provider_overrides_v1";

export function readOverrides(): AdminOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminOverrides) : {};
  } catch {
    return {};
  }
}

export function writeOverrides(data: AdminOverrides) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function setProviderOverride(citySlug: string, providerId: string, patch: ProviderOverride) {
  const all = readOverrides();
  all[citySlug] = { ...(all[citySlug] || {}), [providerId]: { ...(all[citySlug]?.[providerId] || {}), ...patch } };
  writeOverrides(all);
}

function applyOverrides(citySlug: string, list: Provider[]): Provider[] {
  const all = readOverrides();
  const cityOv = all[citySlug];
  if (!cityOv) return list;
  return list.map((p) => {
    if (!p.id) return p;
    const ov = cityOv[p.id];
    return ov ? { ...p, ...ov } : p;
  });
}

const FALLBACK: Provider[] = [
  {
    id: "central-verified",
    name: "Central Guincho Brasil 24h — Parceiro Verificado",
    tier: "gold",
    whatsapp: "5511996451510",
    area: "Cobertura total da cidade",
    rating: 5,
    reviews: 248,
  },
  ...GENERIC_GHOSTS,
];

export function getCityProviders(slugWithUf: string): Provider[] {
  const key = slugWithUf.toLowerCase();
  const direct = CITY_PROVIDERS[key];
  const base = direct && direct.length ? direct : FALLBACK;
  return applyOverrides(key, base);
}

// Lista todas as cidades com prestadores cadastrados (para o admin)
export function listProviderCities(): string[] {
  return Object.keys(CITY_PROVIDERS);
}

export function getRawCityProviders(slugWithUf: string): Provider[] {
  return CITY_PROVIDERS[slugWithUf.toLowerCase()] || FALLBACK;
}
