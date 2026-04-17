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
      name: "Guincho Taubaté Premium 24h — Parceiro Oficial",
      tier: "gold",
      whatsapp: "5511996451510",
      area: "Centro / Independência / Jardim Eulália / Cobertura total",
      rating: 5,
      reviews: 312,
    },
    { name: "Auto Socorro Taubaté 24 Horas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Centro" },
    { name: "Guincho Taubaté Reboque", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila São José" },
    { name: "Reboque Vale do Paraíba Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Quiririm" },
    { name: "Guincho Estrada Real Taubaté", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Rod. Pres. Dutra km 117" },
    { name: "Pronto Socorro Veicular Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Bonfim" },
    { name: "Reboque Cidade Jardim Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim das Nações" },
    { name: "Guincho e Reboque Independência", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Independência" },
    { name: "Auto Socorro Vale Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Esplanada Santa Terezinha" },
    { name: "Reboque Taubaté Express", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Eulália" },
    { name: "Guincho Plataforma Taubaté SP", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Parque São Luís" },
    { name: "Auto Socorro Oswaldo Cruz", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Oswaldo Cruz" },
    { name: "Reboque 24h Taubaté Centro", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Centro Histórico" },
    { name: "Guincho Pesado Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Distrito Industrial" },
    { name: "Guincho de Motos Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila Marli" },
    { name: "Auto Socorro Dutra Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Dutra" },
    { name: "Reboque Jardim Russi", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Russi" },
    { name: "Guincho São Gonçalo Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "São Gonçalo" },
    { name: "Pane Seca Taubaté 24h", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Toda a cidade" },
    { name: "Reboque Granjas Reunidas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Granjas Reunidas" },
    { name: "Guincho Chácara do Visconde", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Chácara do Visconde" },
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
