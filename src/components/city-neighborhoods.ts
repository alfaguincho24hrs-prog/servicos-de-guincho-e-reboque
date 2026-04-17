// Bairros principais e faixas de CEP por cidade — usado para SEO local hiper-segmentado
// nas páginas /guincho-em-{cidade}-{uf}. Cobertura ampliada para SP (capital por zonas,
// Grande SP, ABC, Vale do Paraíba, Campinas, Sorocaba, Baixada Santista, interior).

export type CityLocalData = {
  neighborhoods: string[];
  cepRange?: string;
};

export const CITY_LOCAL: Record<string, CityLocalData> = {
  // ===== CAPITAL SP - por zonas =====
  "sao-paulo-sp": {
    neighborhoods: [
      "Centro", "Sé", "Bela Vista", "Liberdade", "Vila Mariana", "Moema",
      "Pinheiros", "Vila Madalena", "Itaim Bibi", "Jardins", "Brooklin",
      "Morumbi", "Tatuapé", "Mooca", "Santana", "Lapa", "Butantã",
      "Vila Olímpia", "Santo Amaro", "Ipiranga", "Penha", "Guaianases",
    ],
    cepRange: "01000-000 a 05999-999 e 08000-000 a 08499-999",
  },
  "sao-paulo-zona-norte-sp": {
    neighborhoods: [
      "Santana", "Tucuruvi", "Casa Verde", "Limão", "Vila Maria", "Vila Guilherme",
      "Tremembé", "Jaçanã", "Mandaqui", "Vila Nova Cachoeirinha", "Brasilândia",
      "Freguesia do Ó", "Pirituba", "Perus", "Anhanguera", "Vila Medeiros",
    ],
    cepRange: "02000-000 a 02999-999 e 05100-000 a 05299-999",
  },
  "sao-paulo-zona-sul-sp": {
    neighborhoods: [
      "Vila Mariana", "Moema", "Saúde", "Jabaquara", "Santo Amaro", "Brooklin",
      "Campo Belo", "Vila Andrade", "Morumbi", "Capão Redondo", "Campo Limpo",
      "M'Boi Mirim", "Cidade Ademar", "Pedreira", "Grajaú", "Parelheiros",
      "Cidade Dutra", "Socorro", "Interlagos",
    ],
    cepRange: "04000-000 a 04999-999 e 05700-000 a 05899-999",
  },
  "sao-paulo-zona-leste-sp": {
    neighborhoods: [
      "Tatuapé", "Mooca", "Penha", "Itaquera", "Guaianases", "São Mateus",
      "Cidade Tiradentes", "Sapopemba", "Vila Prudente", "Aricanduva",
      "Carrão", "Vila Formosa", "Belém", "Brás", "Artur Alvim", "Ermelino Matarazzo",
      "São Miguel Paulista", "Itaim Paulista", "Cangaíba",
    ],
    cepRange: "03000-000 a 03999-999 e 08000-000 a 08499-999",
  },
  "sao-paulo-zona-oeste-sp": {
    neighborhoods: [
      "Pinheiros", "Vila Madalena", "Lapa", "Perdizes", "Butantã", "Vila Leopoldina",
      "Alto de Pinheiros", "Jaguaré", "Rio Pequeno", "Raposo Tavares", "Morumbi",
      "Vila Sônia", "Jardim Paulista", "Sumaré", "Pompeia", "Barra Funda",
    ],
    cepRange: "05000-000 a 05699-999",
  },
  "sao-paulo-centro-sp": {
    neighborhoods: [
      "Sé", "República", "Centro Histórico", "Bela Vista", "Bom Retiro",
      "Brás", "Cambuci", "Consolação", "Liberdade", "Pari", "Santa Cecília",
      "Higienópolis", "Vila Buarque", "Anhangabaú", "Praça da República",
    ],
    cepRange: "01000-000 a 01599-999",
  },

  // ===== GRANDE SP / ABC =====
  "guarulhos-sp": {
    neighborhoods: [
      "Centro", "Vila Galvão", "Macedo", "Picanço", "Jardim Maia",
      "Jardim Bom Clima", "Pimentas", "Bonsucesso", "Cumbica", "Taboão",
      "Vila Augusta", "Gopouva",
    ],
    cepRange: "07000-000 a 07399-999",
  },
  "sao-bernardo-do-campo-sp": {
    neighborhoods: [
      "Centro", "Rudge Ramos", "Baeta Neves", "Santa Terezinha", "Anchieta",
      "Demarchi", "Assunção", "Ferrazópolis", "Nova Petrópolis", "Riacho Grande",
    ],
    cepRange: "09600-000 a 09899-999",
  },
  "santo-andre-sp": {
    neighborhoods: [
      "Centro", "Vila Assunção", "Jardim", "Campestre", "Bangu", "Vila Bastos",
      "Paraíso", "Utinga", "Santa Maria", "Parque das Nações",
    ],
    cepRange: "09000-000 a 09299-999",
  },
  "sao-caetano-do-sul-sp": {
    neighborhoods: [
      "Centro", "Santa Paula", "Santa Maria", "Cerâmica", "Olímpico",
      "Boa Vista", "Barcelona", "Mauá", "Nova Gerty",
    ],
    cepRange: "09500-000 a 09581-999",
  },
  "diadema-sp": {
    neighborhoods: [
      "Centro", "Eldorado", "Piraporinha", "Casa Grande", "Conceição",
      "Serraria", "Taboão", "Vila Nogueira",
    ],
    cepRange: "09900-000 a 09999-999",
  },
  "maua-sp": {
    neighborhoods: ["Centro", "Vila Bocaina", "Jardim Zaíra", "Sônia Maria", "Itapark", "Falchi Gianini"],
    cepRange: "09300-000 a 09399-999",
  },
  "osasco-sp": {
    neighborhoods: [
      "Centro", "Vila Yara", "Bela Vista", "Presidente Altino", "City Bussocaba",
      "Bonfim", "Helena Maria", "Quitaúna", "Jaguaribe",
    ],
    cepRange: "06000-000 a 06299-999",
  },
  "barueri-sp": {
    neighborhoods: ["Centro", "Alphaville", "Tamboré", "Vila São Jorge", "Engenho Novo"],
    cepRange: "06400-000 a 06499-999",
  },

  // ===== VALE DO PARAÍBA / SERRA / LITORAL NORTE =====
  "sao-jose-dos-campos-sp": {
    neighborhoods: [
      "Centro", "Jardim Aquarius", "Jardim Esplanada", "Vila Adyana", "Urbanova",
      "Jardim Satélite", "Bosque dos Eucaliptos", "Eugênio de Melo", "Putim",
      "Parque Industrial", "Vista Verde",
    ],
    cepRange: "12200-000 a 12249-999",
  },
  "taubate-sp": {
    neighborhoods: ["Centro", "Independência", "Jardim Eulália", "Esplanada Santa Terezinha", "Quiririm"],
    cepRange: "12000-000 a 12099-999",
  },
  "jacarei-sp": {
    neighborhoods: ["Centro", "Jardim Califórnia", "Cidade Salvador", "Jardim Paraíba", "Avareí"],
    cepRange: "12300-000 a 12349-999",
  },
  "campos-do-jordao-sp": {
    neighborhoods: ["Capivari", "Abernéssia", "Jaguaribe", "Vila Capivari", "Vila Albertina"],
    cepRange: "12460-000 a 12469-999",
  },
  "caraguatatuba-sp": {
    neighborhoods: ["Centro", "Martim de Sá", "Indaiá", "Massaguaçu", "Tabatinga", "Porto Novo"],
    cepRange: "11660-000 a 11669-999",
  },
  "ubatuba-sp": {
    neighborhoods: ["Centro", "Itaguá", "Praia Grande", "Maranduba", "Perequê-Açu", "Tenório"],
    cepRange: "11680-000 a 11689-999",
  },
  "sao-sebastiao-sp": {
    neighborhoods: ["Centro", "Boiçucanga", "Maresias", "Juquehy", "Barra do Sahy", "Camburi"],
    cepRange: "11600-000 a 11609-999",
  },

  // ===== REGIÃO DE CAMPINAS =====
  "campinas-sp": {
    neighborhoods: [
      "Centro", "Cambuí", "Taquaral", "Barão Geraldo", "Mansões Santo Antônio",
      "Jardim Chapadão", "Nova Campinas", "Bonfim", "Castelo", "Sousas",
      "Jardim Guanabara", "Vila Industrial", "Ouro Verde",
    ],
    cepRange: "13000-000 a 13139-999",
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
  "indaiatuba-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Vila Furlan", "Jardim Morada do Sol", "Itaici", "Pau Preto"],
    cepRange: "13330-000 a 13349-999",
  },
  "piracicaba-sp": {
    neighborhoods: ["Centro", "Higienópolis", "Paulicéia", "Castelinho", "Santa Terezinha", "Vila Rezende"],
    cepRange: "13400-000 a 13439-999",
  },
  "limeira-sp": {
    neighborhoods: ["Centro", "Vila Cláudia", "Jardim Nova Europa", "Pista de Manobras", "Boa Vista"],
    cepRange: "13480-000 a 13489-999",
  },
  "rio-claro-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Jardim São Paulo", "Vila Aparecida", "Bairro do Estádio"],
    cepRange: "13500-000 a 13509-999",
  },
  "jundiai-sp": {
    neighborhoods: ["Centro", "Anhangabaú", "Jardim Ana Maria", "Vila Arens", "Vianelo", "Vila Hortolândia"],
    cepRange: "13201-000 a 13219-999",
  },
  "atibaia-sp": {
    neighborhoods: ["Centro", "Alvinópolis", "Jardim Paulista", "Caetetuba", "Itapetinga"],
    cepRange: "12940-000 a 12954-999",
  },
  "braganca-paulista-sp": {
    neighborhoods: ["Centro", "Lavapés", "Jardim Itália", "Vila Aparecida", "Penha", "Jardim Europa"],
    cepRange: "12900-000 a 12929-999",
  },

  // ===== REGIÃO DE SOROCABA =====
  "sorocaba-sp": {
    neighborhoods: ["Centro", "Vila Hortência", "Jardim Vergueiro", "Campolim", "Trujillo", "Éden", "Vila Carvalho"],
    cepRange: "18000-000 a 18109-999",
  },
  "votorantim-sp": {
    neighborhoods: ["Centro", "Vossoroca", "Jardim Icatu", "Parque Bela Vista", "Rio Acima"],
    cepRange: "18110-000 a 18119-999",
  },
  "itu-sp": {
    neighborhoods: ["Centro", "Brasil", "Vila Nova", "Cidade Nova", "Pirapitingui"],
    cepRange: "13300-000 a 13319-999",
  },
  "salto-sp": {
    neighborhoods: ["Centro", "Jardim Brasil", "Vila Teixeira", "São José", "Cidade Nova"],
    cepRange: "13320-000 a 13329-999",
  },

  // ===== BAIXADA SANTISTA =====
  "santos-sp": {
    neighborhoods: ["Centro", "Gonzaga", "Boqueirão", "Pompéia", "Aparecida", "José Menino", "Embaré", "Ponta da Praia"],
    cepRange: "11000-000 a 11099-999",
  },
  "sao-vicente-sp": {
    neighborhoods: ["Centro", "Itararé", "Catiapoã", "Vila Cascatinha", "Parque Bitaru", "Humaitá"],
    cepRange: "11300-000 a 11399-999",
  },
  "praia-grande-sp": {
    neighborhoods: ["Boqueirão", "Ocian", "Tupi", "Guilhermina", "Aviação", "Mirim", "Solemar", "Vila Caiçara"],
    cepRange: "11700-000 a 11729-999",
  },
  "guaruja-sp": {
    neighborhoods: ["Pitangueiras", "Astúrias", "Enseada", "Praia da Enseada", "Vicente de Carvalho", "Perequê"],
    cepRange: "11400-000 a 11449-999",
  },
  "cubatao-sp": {
    neighborhoods: ["Centro", "Vila Nova", "Vila Couto", "Ilha Caraguatá", "Jardim Casqueiro"],
    cepRange: "11500-000 a 11549-999",
  },

  // ===== INTERIOR =====
  "ribeirao-preto-sp": {
    neighborhoods: ["Centro", "Jardim Sumaré", "Ribeirânia", "Jardim Califórnia", "Alto da Boa Vista", "Vila Tibério", "Iguatemi"],
    cepRange: "14000-000 a 14114-999",
  },
  "sao-jose-do-rio-preto-sp": {
    neighborhoods: ["Centro", "Boa Vista", "Vila Imperial", "Higienópolis", "Jardim Yolanda", "Redentora"],
    cepRange: "15000-000 a 15109-999",
  },
  "araraquara-sp": {
    neighborhoods: ["Centro", "Vila Xavier", "Jardim Brasil", "Vila Harmonia", "Jardim Pinheiros"],
    cepRange: "14800-000 a 14811-999",
  },
  "sao-carlos-sp": {
    neighborhoods: ["Centro", "Vila Prado", "Jardim Lutfalla", "Cidade Aracy", "Santa Felícia"],
    cepRange: "13560-000 a 13579-999",
  },
  "bauru-sp": {
    neighborhoods: ["Centro", "Vila Cardia", "Vila Falcão", "Higienópolis", "Jardim Estoril", "Parque Vista Alegre"],
    cepRange: "17000-000 a 17109-999",
  },
  "marilia-sp": {
    neighborhoods: ["Centro", "Cascata", "Marília", "Jardim Maria Izabel", "Núcleo Habitacional Nova Marília"],
    cepRange: "17500-000 a 17529-999",
  },
  "presidente-prudente-sp": {
    neighborhoods: ["Centro", "Vila Marcondes", "Jardim Bongiovani", "Parque Higienópolis", "Vila Furquim"],
    cepRange: "19000-000 a 19069-999",
  },
  "aracatuba-sp": {
    neighborhoods: ["Centro", "Higienópolis", "Vila Mendonça", "Vila Maria", "Aviação", "Bandeirantes"],
    cepRange: "16000-000 a 16059-999",
  },
  "franca-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Vila Aparecida", "Jardim Aeroporto", "Esplanada Primo Meneghetti"],
    cepRange: "14400-000 a 14414-999",
  },

  // ===== OUTRAS CAPITAIS =====
  "rio-de-janeiro-rj": {
    neighborhoods: [
      "Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo",
      "Tijuca", "Barra da Tijuca", "Recreio", "Jacarepaguá", "Méier",
      "Madureira", "Campo Grande", "Bangu", "Santa Cruz", "Ilha do Governador",
    ],
    cepRange: "20000-000 a 23799-999",
  },
  "belo-horizonte-mg": {
    neighborhoods: ["Centro", "Savassi", "Funcionários", "Lourdes", "Buritis", "Pampulha", "Belvedere", "Anchieta", "Cidade Nova", "Barreiro", "Venda Nova"],
    cepRange: "30000-000 a 31999-999",
  },
  "curitiba-pr": {
    neighborhoods: ["Centro", "Batel", "Água Verde", "Bigorrilho", "Cabral", "Juvevê", "Mercês", "Champagnat", "Portão", "Boqueirão", "CIC", "Santa Felicidade"],
    cepRange: "80000-000 a 82999-999",
  },
  "porto-alegre-rs": {
    neighborhoods: ["Centro Histórico", "Moinhos de Vento", "Bela Vista", "Mont Serrat", "Petrópolis", "Menino Deus", "Cidade Baixa", "Bom Fim", "Tristeza", "Ipanema"],
    cepRange: "90000-000 a 91999-999",
  },
  "salvador-ba": {
    neighborhoods: ["Centro", "Pelourinho", "Barra", "Ondina", "Rio Vermelho", "Pituba", "Itaigara", "Caminho das Árvores", "Imbuí", "Stiep", "Itapuã"],
    cepRange: "40000-000 a 42599-999",
  },
  "brasilia-df": {
    neighborhoods: ["Asa Norte", "Asa Sul", "Lago Sul", "Lago Norte", "Sudoeste", "Noroeste", "Águas Claras", "Taguatinga", "Ceilândia", "Guará"],
    cepRange: "70000-000 a 72799-999",
  },
  "fortaleza-ce": {
    neighborhoods: ["Centro", "Aldeota", "Meireles", "Praia de Iracema", "Mucuripe", "Cocó", "Papicu", "Varjota", "Messejana", "Parangaba"],
    cepRange: "60000-000 a 61699-999",
  },
};

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
  // tenta sem o sufixo -uf
  const withoutUf = key.replace(new RegExp(`-${uf.toLowerCase()}$`), "");
  if (CITY_LOCAL[`${withoutUf}-${uf.toLowerCase()}`]) {
    return CITY_LOCAL[`${withoutUf}-${uf.toLowerCase()}`];
  }
  return {
    neighborhoods: GENERIC_NEIGHBORHOODS,
    cepRange: UF_CEP[uf.toUpperCase()],
  };
}
