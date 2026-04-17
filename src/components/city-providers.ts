// Diretório de prestadores por cidade (slug-uf).
// "gold" = parceiro pagante (telefone real liberado).
// "ghost" = lead capturado (telefone borrado, CTA central).

export type ProviderTier = "gold" | "ghost";

export type Provider = {
  name: string;
  tier: ProviderTier;
  // Apenas usado quando tier === "gold"
  whatsapp?: string; // formato 5511999999999
  phoneMasked?: string; // ex: (12) 9****-****
  area?: string; // bairro/região coberta
  rating?: number;
  reviews?: number;
};

// Pool genérico (usado quando a cidade não tem cadastro próprio).
const GENERIC_GHOSTS: Provider[] = [
  { name: "Auto Socorro Estrada Real", tier: "ghost", phoneMasked: "9****-****", area: "Centro" },
  { name: "Reboques São Cristóvão", tier: "ghost", phoneMasked: "9****-****", area: "Zona Norte" },
  { name: "Guincho Express Rodoviário", tier: "ghost", phoneMasked: "9****-****", area: "Rodovia" },
  { name: "Tow Service 24h Local", tier: "ghost", phoneMasked: "9****-****", area: "Zona Sul" },
  { name: "Reboque Águia Veloz", tier: "ghost", phoneMasked: "9****-****", area: "Zona Leste" },
  { name: "Guincho Pronto Socorro Auto", tier: "ghost", phoneMasked: "9****-****", area: "Zona Oeste" },
];

// Cadastro real (parcial). Pode crescer ao longo do tempo.
const CITY_PROVIDERS: Record<string, Provider[]> = {
  "taubate-sp": [
    {
      name: "Guincho Taubaté Premium 24h",
      tier: "gold",
      whatsapp: "5511996451510",
      area: "Centro / Independência / Jardim Eulália",
      rating: 5,
      reviews: 312,
    },
    {
      name: "Auto Socorro Zé Taubaté",
      tier: "ghost",
      phoneMasked: "(12) 9****-****",
      area: "Vila São José",
    },
    {
      name: "Reboque Vale do Paraíba",
      tier: "ghost",
      phoneMasked: "(12) 9****-****",
      area: "Quiririm / Rod. Oswaldo Cruz",
    },
    {
      name: "Guincho Estrada Real Taubaté",
      tier: "ghost",
      phoneMasked: "(12) 9****-****",
      area: "Rod. Presidente Dutra km 117",
    },
    {
      name: "Pronto Socorro Veicular Tauba",
      tier: "ghost",
      phoneMasked: "(12) 9****-****",
      area: "Bonfim / Esplanada Santa Terezinha",
    },
    {
      name: "Reboque Cidade Jardim 24h",
      tier: "ghost",
      phoneMasked: "(12) 9****-****",
      area: "Jardim das Nações",
    },
  ],
};

export function getCityProviders(slugWithUf: string): Provider[] {
  const direct = CITY_PROVIDERS[slugWithUf.toLowerCase()];
  if (direct && direct.length) return direct;
  // Sempre garante 1 gold + ghosts genéricos para a cidade ter densidade
  return [
    {
      name: "Central Guincho Brasil 24h — Parceiro Verificado",
      tier: "gold",
      whatsapp: "5511996451510",
      area: "Cobertura total da cidade",
      rating: 5,
      reviews: 248,
    },
    ...GENERIC_GHOSTS,
  ];
}
