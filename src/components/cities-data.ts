// Lista ampla de cidades brasileiras para cobertura de guincho e reboque 24h
// Organizadas para SEO local e geo-targeting (GEO/SEO nacional)

export type City = { name: string; uf: string; slug: string };

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const RAW: Array<[string, string]> = [
  // A
  ["Aracaju", "SE"], ["Anápolis", "GO"], ["Americana", "SP"], ["Aparecida de Goiânia", "GO"],
  ["Araraquara", "SP"], ["Araçatuba", "SP"], ["Arapiraca", "AL"], ["Angra dos Reis", "RJ"],
  // B
  ["Belo Horizonte", "MG"], ["Brasília", "DF"], ["Belém", "PA"], ["Blumenau", "SC"],
  ["Bauru", "SP"], ["Boa Vista", "RR"], ["Barueri", "SP"], ["Betim", "MG"],
  // C
  ["Curitiba", "PR"], ["Campinas", "SP"], ["Cuiabá", "MT"], ["Campo Grande", "MS"],
  ["Caxias do Sul", "RS"], ["Contagem", "MG"], ["Cascavel", "PR"], ["Caruaru", "PE"],
  ["Carapicuíba", "SP"], ["Camaçari", "BA"], ["Canoas", "RS"],
  // D
  ["Diadema", "SP"], ["Duque de Caxias", "RJ"], ["Divinópolis", "MG"], ["Dourados", "MS"],
  // E
  ["Embu das Artes", "SP"], ["Erechim", "RS"],
  // F
  ["Fortaleza", "CE"], ["Florianópolis", "SC"], ["Foz do Iguaçu", "PR"], ["Feira de Santana", "BA"],
  ["Franca", "SP"], ["Ferraz de Vasconcelos", "SP"],
  // G
  ["Goiânia", "GO"], ["Guarulhos", "SP"], ["Governador Valadares", "MG"], ["Gravataí", "RS"],
  // H
  ["Hortolândia", "SP"],
  // I
  ["Itaquaquecetuba", "SP"], ["Ipatinga", "MG"], ["Indaiatuba", "SP"], ["Itabuna", "BA"],
  ["Imperatriz", "MA"], ["Ilhéus", "BA"],
  // J
  ["João Pessoa", "PB"], ["Joinville", "SC"], ["Juiz de Fora", "MG"], ["Jundiaí", "SP"],
  ["Jaboatão dos Guararapes", "PE"], ["Juazeiro do Norte", "CE"],
  // L
  ["Londrina", "PR"], ["Limeira", "SP"], ["Lauro de Freitas", "BA"], ["Linhares", "ES"],
  // M
  ["Manaus", "AM"], ["Maceió", "AL"], ["Maringá", "PR"], ["Mauá", "SP"],
  ["Montes Claros", "MG"], ["Marília", "SP"], ["Mogi das Cruzes", "SP"], ["Macapá", "AP"],
  // N
  ["Natal", "RN"], ["Niterói", "RJ"], ["Nova Iguaçu", "RJ"], ["Novo Hamburgo", "RS"],
  // O
  ["Osasco", "SP"], ["Olinda", "PE"], ["Ourinhos", "SP"],
  // P
  ["Porto Alegre", "RS"], ["Recife", "PE"], ["Petrópolis", "RJ"], ["Piracicaba", "SP"],
  ["Pelotas", "RS"], ["Ponta Grossa", "PR"], ["Porto Velho", "RO"], ["Praia Grande", "SP"],
  ["Palmas", "TO"], ["Paulista", "PE"], ["Parnamirim", "RN"],
  // Q
  ["Queimados", "RJ"],
  // R
  ["Rio de Janeiro", "RJ"], ["Ribeirão Preto", "SP"], ["Rio Branco", "AC"], ["Rio Grande", "RS"],
  ["Rondonópolis", "MT"],
  // S
  ["São Paulo", "SP"], ["Salvador", "BA"], ["São Luís", "MA"], ["São Bernardo do Campo", "SP"],
  ["Santo André", "SP"], ["Santos", "SP"], ["São José dos Campos", "SP"], ["Sorocaba", "SP"],
  ["São José do Rio Preto", "SP"], ["Suzano", "SP"], ["São Vicente", "SP"], ["Sumaré", "SP"],
  ["Santa Maria", "RS"], ["São Carlos", "SP"], ["Sete Lagoas", "MG"], ["Sobral", "CE"],
  ["São Gonçalo", "RJ"], ["São João de Meriti", "RJ"],
  // T
  ["Teresina", "PI"], ["Taubaté", "SP"], ["Taboão da Serra", "SP"], ["Teófilo Otoni", "MG"],
  // U
  ["Uberlândia", "MG"], ["Uberaba", "MG"], ["Umuarama", "PR"],
  // V
  ["Vitória", "ES"], ["Vila Velha", "ES"], ["Volta Redonda", "RJ"], ["Várzea Grande", "MT"],
  ["Viamão", "RS"], ["Valparaíso de Goiás", "GO"],
  // X
  ["Xanxerê", "SC"],
];

export const ALL_CITIES: City[] = RAW.map(([name, uf]) => ({
  name,
  uf,
  slug: slugify(name),
})).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export const CITIES_BY_LETTER: Record<string, City[]> = ALL_CITIES.reduce(
  (acc, c) => {
    const letter = c.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")[0]
      .toUpperCase();
    (acc[letter] ||= []).push(c);
    return acc;
  },
  {} as Record<string, City[]>
);

export const ALPHABET = Object.keys(CITIES_BY_LETTER).sort();
