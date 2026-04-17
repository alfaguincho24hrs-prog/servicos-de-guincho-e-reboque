// Gera variações determinísticas de textos por cidade, evitando "doorway pages".
// O mesmo slug sempre produz o mesmo conteúdo (estável para SEO), mas cidades
// diferentes recebem títulos, parágrafos e FAQs distintos — como se um redator
// humano tivesse escrito cada página.

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, salt = 0): T {
  return arr[(seed + salt) % arr.length];
}

export type CityCopy = {
  heroIntro: string;
  servicesTitle: string;
  servicesIntro: string;
  neighborhoodsTitle: string;
  whyTitle: string;
  faqTitle: string;
  longTitle: string;
  longIntro: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

export function getCityCopy(cityName: string, uf: string, slug: string): CityCopy {
  const seed = hash(`${slug}-${uf}`);
  const c = cityName;
  const cu = `${cityName}/${uf}`;

  const heroIntros = [
    `Ficou na mão em ${c}? A gente resolve. Nossa central despacha o guincho mais próximo da sua localização em poucos minutos, com profissionais habilitados e equipamento certo para qualquer veículo — do hatch ao caminhão pesado.`,
    `Pane no meio do trânsito de ${c}? Respira fundo: estamos a uma ligação de distância. Atendimento 24 horas, todos os dias, com motoristas que conhecem a cidade de ponta a ponta e chegam rápido até onde você está.`,
    `Quando o carro para em ${c}, cada minuto pesa. Por isso operamos com uma rede local enxuta e ágil — guincho leve, pesado, moto, auto socorro e pane seca, tudo coordenado por uma única central que atende dia, noite e feriado.`,
    `Precisando de reboque agora em ${c}? Acionamos o parceiro mais próximo do seu endereço e você acompanha o tempo de chegada. Sem enrolação, sem taxa surpresa: orçamento fechado antes do guincho sair.`,
    `Carro parado em ${c} não é o fim do dia — é só uma ligação. A gente toca a operação local com prestadores que já estão na rua, prontos para sair assim que sua chamada cai na central.`,
    `Em ${c}, qualquer ocorrência veicular vira prioridade pra gente: pane mecânica, batida, pneu furado, falta de combustível ou simplesmente um carro que não dá partida no estacionamento. Liga, descreve, resolve.`,
    `A vida em ${c} não para — e quando o seu carro para, a gente entra em ação. Equipes de plantão, central que atende em segundos e cobertura que vai do centro às bordas da cidade, inclusive nas rodovias de acesso.`,
  ];

  const servicesTitles = [
    `Tipos de guincho que você encontra em ${c}`,
    `Quais serviços de reboque atendem ${c}?`,
    `Soluções de socorro veicular em ${c}`,
    `O que a nossa rede cobre em ${c}`,
  ];

  const servicesIntros = [
    `Da plataforma leve para o seu carro de passeio até o guincho pesado para caminhões: a operação em ${cu} foi montada para resolver praticamente qualquer ocorrência sem precisar de uma segunda ligação.`,
    `Em ${cu} trabalhamos com prestadores que cobrem desde uma simples bateria descarregada até remoção de veículos sinistrados. Você descreve o problema e a central encaixa o serviço certo.`,
    `Os parceiros credenciados em ${cu} atuam em centro, bairros residenciais, distritos industriais e nos principais acessos rodoviários — com equipamento adequado para cada tipo de chamado.`,
  ];

  const neighborhoodsTitles = [
    `Bairros de ${c} onde nosso guincho atende`,
    `Cobertura por bairros em ${c}`,
    `Onde o guincho chega rápido em ${c}`,
  ];

  const whyTitles = [
    `Por que chamar a gente em ${c}?`,
    `O que faz a diferença no socorro em ${c}`,
    `Vantagens de acionar nossa rede em ${c}`,
  ];

  const faqTitlesByVariant = [
    `Dúvidas frequentes sobre guincho em ${c}`,
    `Quanto custa e como acionar um reboque em ${c}`,
    `Perguntas comuns de quem aciona guincho em ${c}`,
    `O que motoristas mais perguntam sobre reboque em ${c}`,
  ];

  const longTitles = [
    `Guincho 24 horas em ${c}: socorro veicular completo perto de você`,
    `Reboque rápido em ${c}: como funciona o atendimento da nossa rede`,
    `Auto socorro em ${cu}: o que esperar quando você liga`,
    `Guincho em ${c}: cobertura, tempo de chegada e tipos de veículo atendidos`,
  ];

  const longIntros = [
    `Quebrar o carro nunca acontece na hora boa. Em ${cu}, a gente encurta esse problema mantendo uma malha de prestadores locais que conhecem cada avenida, viela e contorno da cidade. Isso reduz o tempo de chegada e evita aquele “estou indo” que nunca termina.`,
    `O socorro veicular em ${cu} mudou bastante nos últimos anos: hoje, em vez de procurar dezenas de telefones, você liga em um só número e a central decide qual parceiro está mais perto e melhor equipado para o seu caso. É essa logística que tentamos entregar todos os dias.`,
    `Trabalhamos em ${cu} com a lógica de reduzir atrito: você descreve a situação, recebe o orçamento, confirma e o guincho sai. Sem cadastro complicado, sem espera em URA, sem taxa “de deslocamento” que só aparece no fim do serviço.`,
  ];

  const ctaTitles = [
    `Guincho 24h em ${c} a um clique de distância`,
    `Está parado em ${c}? Acione agora`,
    `Reboque em ${c}: ligue e resolva em minutos`,
  ];

  // Pool de FAQs — escolhe 4 variações diferentes por cidade
  const faqPool: { q: string; a: string }[] = [
    {
      q: `Quanto custa um guincho em ${c}?`,
      a: `O preço depende da distância percorrida, do tipo de veículo e do horário. Em ${c}, atendimentos urbanos costumam ficar mais em conta do que serviços em rodovia. O orçamento é passado antes de o guincho sair, sem cobrança surpresa no fim.`,
    },
    {
      q: `Em quanto tempo o guincho chega em ${c}?`,
      a: `Em áreas urbanas de ${c} o tempo médio fica entre 20 e 40 minutos, dependendo do trânsito e do bairro. Para chamadas em rodovia ou periferia mais distante, a equipe informa um prazo realista logo na ligação.`,
    },
    {
      q: `Vocês atendem rodovias próximas a ${c}?`,
      a: `Sim. A operação em ${c} cobre a malha rodoviária de acesso à cidade, incluindo trechos urbanos, rotatórias, marginais e estradas vicinais. Equipes saem com sinalização completa para trabalhar em pista com segurança.`,
    },
    {
      q: `O serviço é mesmo 24 horas em ${c}?`,
      a: `É. Não fechamos em feriado, não fechamos de madrugada e não fechamos no fim de semana. A central de ${c} opera 24/7 — você liga, alguém atende, o guincho sai.`,
    },
    {
      q: `Posso pagar como em ${c}?`,
      a: `Os parceiros em ${c} aceitam PIX, dinheiro, cartão de crédito/débito e os principais aplicativos de pagamento. Em alguns casos, dá para faturar para empresa ou seguradora — basta combinar antes do início do serviço.`,
    },
    {
      q: `Vocês fazem guincho de moto em ${c}?`,
      a: `Sim. Em ${c} usamos plataformas com içamento adequado para motos, sem risco de arranhar a pintura ou danificar a carenagem. O motociclista pode acompanhar o transporte, se preferir.`,
    },
    {
      q: `E se meu carro estiver em garagem subterrânea em ${c}?`,
      a: `Antes de despachar a equipe em ${c} a gente confirma a altura livre da garagem e o porte do veículo, para mandar a plataforma certa. Em casos extremos, usamos prancha rebaixada ou içamento manual.`,
    },
    {
      q: `Atendem caminhão e veículo pesado em ${c}?`,
      a: `Sim. Para cargas pesadas em ${c} acionamos guincho específico — pesado, prancha ou munk — conforme o peso e o tipo do veículo. É só descrever o problema na ligação para a central encaixar o equipamento correto.`,
    },
  ];

  // Seleciona 4 FAQs distintas a partir do pool
  const faqs: { q: string; a: string }[] = [];
  for (let i = 0; i < 4; i++) {
    const item = faqPool[(seed + i * 3) % faqPool.length];
    if (!faqs.find((f) => f.q === item.q)) faqs.push(item);
  }
  // Garante 4 itens
  let k = 1;
  while (faqs.length < 4) {
    const item = faqPool[(seed + k++) % faqPool.length];
    if (!faqs.find((f) => f.q === item.q)) faqs.push(item);
  }

  return {
    heroIntro: pick(heroIntros, seed, 0),
    servicesTitle: pick(servicesTitles, seed, 1),
    servicesIntro: pick(servicesIntros, seed, 2),
    neighborhoodsTitle: pick(neighborhoodsTitles, seed, 3),
    whyTitle: pick(whyTitles, seed, 4),
    faqTitle: pick(faqTitlesByVariant, seed, 5),
    longTitle: pick(longTitles, seed, 6),
    longIntro: pick(longIntros, seed, 7),
    ctaTitle: pick(ctaTitles, seed, 8),
    faqs,
  };
}
