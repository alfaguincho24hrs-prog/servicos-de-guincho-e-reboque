// Bairros principais e faixas de CEP por cidade — usado para SEO local hiper-segmentado
// nas páginas /guincho-em-{cidade}-{uf}.
// Para cidades sem dados específicos, usamos um conjunto genérico + faixa de CEP por UF.

export type CityLocalData = {
  neighborhoods: string[];
  cepRange?: string; // ex: "13465-000 a 13479-999"
};

// Dados reais (resumidos) para principais cidades
export const CITY_LOCAL: Record<string, CityLocalData> = {
  "sao-paulo-sp": {
    neighborhoods: [
      "Centro", "Sé", "Bela Vista", "Liberdade", "Vila Mariana", "Moema",
      "Pinheiros", "Vila Madalena", "Itaim Bibi", "Jardins", "Brooklin",
      "Morumbi", "Tatuapé", "Mooca", "Santana", "Lapa", "Butantã",
      "Vila Olímpia", "Santo Amaro", "Ipiranga", "Penha", "Guaianases",
    ],
    cepRange: "01000-000 a 05999-999 e 08000-000 a 08499-999",
  },
  "rio-de-janeiro-rj": {
    neighborhoods: [
      "Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo",
      "Tijuca", "Barra da Tijuca", "Recreio", "Jacarepaguá", "Méier",
      "Madureira", "Campo Grande", "Bangu", "Santa Cruz", "Ilha do Governador",
    ],
    cepRange: "20000-000 a 23799-999",
  },
  "americana-sp": {
    neighborhoods: [
      "Centro", "Jardim São Paulo", "Vila Santa Catarina", "Cidade Jardim",
      "Parque Universitário", "Jardim Brasil", "Vila Frezzarin",
      "Jardim Werner Plaas", "Praia Azul", "São Manoel", "Antônio Zanaga",
      "Jardim Boer", "Vila Bertini", "Cariobinha",
    ],
    cepRange: "13465-000 a 13479-999",
  },
  "campinas-sp": {
    neighborhoods: [
      "Centro", "Cambuí", "Taquaral", "Barão Geraldo", "Mansões Santo Antônio",
      "Jardim Chapadão", "Nova Campinas", "Bonfim", "Castelo", "Sousas",
      "Jardim Guanabara", "Vila Industrial", "Ouro Verde",
    ],
    cepRange: "13000-000 a 13139-999",
  },
  "belo-horizonte-mg": {
    neighborhoods: [
      "Centro", "Savassi", "Funcionários", "Lourdes", "Buritis", "Pampulha",
      "Belvedere", "Anchieta", "Cidade Nova", "Barreiro", "Venda Nova",
      "Sion", "Santa Tereza", "Floresta",
    ],
    cepRange: "30000-000 a 31999-999",
  },
  "curitiba-pr": {
    neighborhoods: [
      "Centro", "Batel", "Água Verde", "Bigorrilho", "Cabral", "Juvevê",
      "Mercês", "Champagnat", "Portão", "Boqueirão", "CIC", "Santa Felicidade",
      "Cajuru", "Bairro Alto",
    ],
    cepRange: "80000-000 a 82999-999",
  },
  "porto-alegre-rs": {
    neighborhoods: [
      "Centro Histórico", "Moinhos de Vento", "Bela Vista", "Mont Serrat",
      "Petrópolis", "Menino Deus", "Cidade Baixa", "Bom Fim", "Tristeza",
      "Ipanema", "Restinga", "Sarandi", "Partenon",
    ],
    cepRange: "90000-000 a 91999-999",
  },
  "salvador-ba": {
    neighborhoods: [
      "Centro", "Pelourinho", "Barra", "Ondina", "Rio Vermelho", "Pituba",
      "Itaigara", "Caminho das Árvores", "Imbuí", "Stiep", "Cabula",
      "Itapuã", "Stella Maris", "Subúrbio Ferroviário",
    ],
    cepRange: "40000-000 a 42599-999",
  },
  "brasilia-df": {
    neighborhoods: [
      "Asa Norte", "Asa Sul", "Lago Sul", "Lago Norte", "Sudoeste", "Noroeste",
      "Águas Claras", "Taguatinga", "Ceilândia", "Guará", "Cruzeiro",
      "Samambaia", "Gama", "Sobradinho",
    ],
    cepRange: "70000-000 a 72799-999",
  },
  "fortaleza-ce": {
    neighborhoods: [
      "Centro", "Aldeota", "Meireles", "Praia de Iracema", "Mucuripe",
      "Cocó", "Papicu", "Varjota", "Dionísio Torres", "Joaquim Távora",
      "Messejana", "Parangaba", "Maraponga",
    ],
    cepRange: "60000-000 a 61699-999",
  },
  "guarulhos-sp": {
    neighborhoods: [
      "Centro", "Vila Galvão", "Macedo", "Picanço", "Jardim Maia",
      "Jardim Bom Clima", "Pimentas", "Bonsucesso", "Cumbica", "Taboão",
      "Vila Augusta", "Gopouva",
    ],
    cepRange: "07000-000 a 07399-999",
  },
};

// Faixa de CEP padrão por UF (início) — usado como fallback
const UF_CEP: Record<string, string> = {
  SP: "01000-000 a 19999-999",
  RJ: "20000-000 a 28999-999",
  MG: "30000-000 a 39999-999",
  ES: "29000-000 a 29999-999",
  BA: "40000-000 a 48999-999",
  SE: "49000-000 a 49999-999",
  PE: "50000-000 a 56999-999",
  AL: "57000-000 a 57999-999",
  PB: "58000-000 a 58999-999",
  RN: "59000-000 a 59999-999",
  CE: "60000-000 a 63999-999",
  PI: "64000-000 a 64999-999",
  MA: "65000-000 a 65999-999",
  PA: "66000-000 a 68899-999",
  AP: "68900-000 a 68999-999",
  AM: "69000-000 a 69299-999",
  RR: "69300-000 a 69399-999",
  AC: "69900-000 a 69999-999",
  DF: "70000-000 a 72799-999",
  GO: "72800-000 a 76799-999",
  TO: "77000-000 a 77999-999",
  MT: "78000-000 a 78899-999",
  RO: "78900-000 a 78999-999",
  MS: "79000-000 a 79999-999",
  PR: "80000-000 a 87999-999",
  SC: "88000-000 a 89999-999",
  RS: "90000-000 a 99999-999",
};

const GENERIC_NEIGHBORHOODS = [
  "Centro",
  "Jardim Brasil",
  "Vila Nova",
  "Jardim América",
  "Jardim Europa",
  "Vila São José",
  "Parque Industrial",
  "Cidade Alta",
  "Cidade Baixa",
  "Bairro Alto",
  "Vila Operária",
  "Jardim Santa Rosa",
];

export function getCityLocalData(slug: string, uf: string): CityLocalData {
  const key = slug.toLowerCase();
  if (CITY_LOCAL[key]) return CITY_LOCAL[key];
  return {
    neighborhoods: GENERIC_NEIGHBORHOODS,
    cepRange: UF_CEP[uf.toUpperCase()],
  };
}
