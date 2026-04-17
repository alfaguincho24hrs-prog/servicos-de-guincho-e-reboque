// Blog posts storage with localStorage persistence + default seed posts.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish plain text with double newlines as paragraph breaks
  date: string;
  category: string;
  coverUrl?: string;
};

const STORAGE_KEY = "blog_posts_v1";

export const DEFAULT_POSTS: BlogPost[] = [
  {
    slug: "como-escolher-guincho-confiavel",
    title: "Como escolher um guincho confiável em 2026",
    excerpt:
      "Descubra os critérios essenciais para contratar um serviço de guincho seguro, rápido e com preço justo na sua cidade.",
    date: "12 de abril de 2026",
    category: "Guias",
    content:
      "Contratar um guincho de confiança em uma situação de emergência exige atenção a alguns pontos básicos.\n\nVerifique se a empresa possui CNPJ ativo, avaliações reais de clientes e atendimento 24 horas. Peça sempre um orçamento claro antes do serviço, incluindo o valor da km rodada e taxa de saída.\n\nEmpresas sérias trabalham com plataformas hidráulicas modernas, motoristas habilitados e seguro de carga. Desconfie de preços muito abaixo da média do mercado.",
  },
  {
    slug: "diferenca-guincho-leve-pesado",
    title: "Qual a diferença entre guincho leve e guincho pesado?",
    excerpt:
      "Entenda quando contratar cada tipo de guincho, a capacidade de carga, equipamentos usados e os principais cenários.",
    date: "05 de abril de 2026",
    category: "Tipos de Serviço",
    content:
      "O guincho leve atende veículos de até 3,5 toneladas: carros de passeio, SUVs, utilitários e pequenas vans.\n\nJá o guincho pesado é indicado para caminhões, ônibus, máquinas agrícolas e veículos acima de 8 toneladas. Utiliza guinchos de lança e plataformas reforçadas.\n\nContratar o tipo errado pode danificar o veículo e atrasar o atendimento. Sempre informe o modelo e peso aproximado ao acionar o serviço.",
  },
  {
    slug: "o-que-fazer-pane-rodovia",
    title: "O que fazer em caso de pane na rodovia",
    excerpt:
      "Passo a passo de segurança: sinalização, posicionamento do veículo, acionamento do guincho e cuidados com a sua segurança.",
    date: "28 de março de 2026",
    category: "Segurança",
    content:
      "1. Pare em local seguro: prefira o acostamento, com o veículo o mais afastado possível da pista.\n\n2. Ligue o pisca-alerta e coloque o triângulo a pelo menos 30 metros atrás do carro.\n\n3. Saia pelo lado oposto ao tráfego e aguarde atrás da defensa metálica, nunca dentro do veículo.\n\n4. Acione um guincho 24h informando a rodovia, km e sentido. Mantenha o celular carregado e tenha o documento do carro em mãos.",
  },
  {
    slug: "guincho-de-motos-cuidados",
    title: "Guincho de motos: cuidados para um transporte seguro",
    excerpt:
      "Saiba como o içamento correto evita arranhões, danos na suspensão e mantém sua moto íntegra durante o transporte.",
    date: "20 de março de 2026",
    category: "Motos",
    content:
      "O transporte de motocicletas exige equipamento específico: rampa antiderrapante, cintas de amarração com proteção e calço para a roda dianteira.\n\nUm bom guincho de motos nunca deita o veículo na carroceria sem estrutura de apoio. Isso evita danos na carenagem, retrovisores e suspensão.\n\nAntes de embarcar, peça para o motorista fotografar a moto. É garantia para ambas as partes em caso de qualquer ocorrência.",
  },
  {
    slug: "pane-seca-como-evitar",
    title: "Pane seca: como evitar e o que fazer quando acontece",
    excerpt:
      "Dicas práticas para nunca ficar sem combustível e como acionar entrega emergencial caso aconteça.",
    date: "10 de março de 2026",
    category: "Dicas",
    content:
      "Para evitar a pane seca: nunca rode com o ponteiro abaixo de 1/4 do tanque, principalmente em viagens longas e rodovias com poucos postos.\n\nSe acontecer, pare em local seguro, sinalize e acione um serviço de pane seca. A maioria das empresas entrega de 5 a 10 litros de combustível direto no local em poucos minutos.\n\nNunca tente empurrar o carro em rodovia movimentada. Aguarde o socorro com segurança.",
  },
  {
    slug: "remocao-veicular-sinistro",
    title: "Remoção veicular após sinistro: como funciona",
    excerpt:
      "Entenda o processo de remoção de veículos sinistrados, documentação necessária e prazos típicos.",
    date: "01 de março de 2026",
    category: "Remoção",
    content:
      "Após um sinistro, a remoção do veículo costuma ser solicitada pela seguradora ou pelo proprietário. É necessário documento do veículo, CNH e, em alguns casos, boletim de ocorrência.\n\nO guincho leva o carro até o pátio, oficina indicada ou residência do proprietário. O prazo de chegada varia de 30 minutos a 2 horas conforme a região.\n\nGuarde sempre o comprovante de retirada assinado pelo motorista do guincho.",
  },
];

function readStored(): BlogPost[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as BlogPost[];
  } catch {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const stored = readStored();
  return stored ?? DEFAULT_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

function persist(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function upsertPost(post: BlogPost) {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  persist(posts);
}

export function deletePost(slug: string) {
  const posts = getAllPosts().filter((p) => p.slug !== slug);
  persist(posts);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
