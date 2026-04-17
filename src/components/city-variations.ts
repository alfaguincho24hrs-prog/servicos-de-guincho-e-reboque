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
    `Trabalhar com socorro veicular em ${c} é mais do que rebocar carro: é chegar antes do problema piorar. Por isso nosso despacho prioriza a equipe que está a menos quilômetros do seu endereço.`,
    `Se você está em ${c} e o veículo simplesmente não anda, não tente improvisar. Uma ligação para a nossa central já coloca um guincho profissional a caminho, com sinalização e seguro em dia.`,
  ];

  const servicesTitles = [
    `Tipos de guincho que você encontra em ${c}`,
    `Quais serviços de reboque atendem ${c}?`,
    `Soluções de socorro veicular em ${c}`,
    `O que a nossa rede cobre em ${c}`,
    `Serviços disponíveis para motoristas em ${c}`,
    `Atendimentos que resolvemos hoje mesmo em ${c}`,
    `Do hatch ao caminhão: o que rebocamos em ${c}`,
  ];

  const servicesIntros = [
    `Da plataforma leve para o seu carro de passeio até o guincho pesado para caminhões: a operação em ${cu} foi montada para resolver praticamente qualquer ocorrência sem precisar de uma segunda ligação.`,
    `Em ${cu} trabalhamos com prestadores que cobrem desde uma simples bateria descarregada até remoção de veículos sinistrados. Você descreve o problema e a central encaixa o serviço certo.`,
    `Os parceiros credenciados em ${cu} atuam em centro, bairros residenciais, distritos industriais e nos principais acessos rodoviários — com equipamento adequado para cada tipo de chamado.`,
    `Cada chamado em ${cu} cai numa central que sabe diferenciar pane elétrica de pane mecânica, moto de carro, urbano de rodovia. Isso evita que você espere o equipamento errado.`,
    `Nossa estrutura em ${cu} foi pensada para ocorrências de pequena urgência (pneu, bateria, chave trancada) e também para o pesado: caminhões, ônibus, máquinas agrícolas e veículos sinistrados.`,
    `Em ${cu}, oferecemos uma carteira completa de serviços rodantes: guincho leve, plataforma estendida, prancha rebaixada, asa-delta, içamento de moto, entrega de combustível e auto socorro mecânico no local.`,
    `Listamos abaixo os serviços mais acionados pelos motoristas em ${cu}. Se sua situação não estiver na lista, ligue mesmo assim — a central encaixa um parceiro adequado.`,
    `A demanda em ${cu} é variada e a nossa frota acompanha: do utilitário urbano que precisa só de um empurrãozinho até o cavalo mecânico que travou na entrada da cidade.`,
  ];

  const neighborhoodsTitles = [
    `Bairros de ${c} onde nosso guincho atende`,
    `Cobertura por bairros em ${c}`,
    `Onde o guincho chega rápido em ${c}`,
    `Atendimento por região em ${c}`,
    `Mapa de cobertura: bairros de ${c}`,
  ];

  const whyTitles = [
    `Por que chamar a gente em ${c}?`,
    `O que faz a diferença no socorro em ${c}`,
    `Vantagens de acionar nossa rede em ${c}`,
    `Motivos para escolher nosso guincho em ${c}`,
    `O que motoristas de ${c} dizem sobre o nosso atendimento`,
  ];

  const faqTitlesByVariant = [
    `Dúvidas frequentes sobre guincho em ${c}`,
    `Quanto custa e como acionar um reboque em ${c}`,
    `Perguntas comuns de quem aciona guincho em ${c}`,
    `O que motoristas mais perguntam sobre reboque em ${c}`,
    `Tudo o que você precisa saber antes de chamar guincho em ${c}`,
    `Antes de ligar: dúvidas comuns sobre socorro em ${c}`,
  ];

  const longTitles = [
    `Guincho 24 horas em ${c}: socorro veicular completo perto de você`,
    `Reboque rápido em ${c}: como funciona o atendimento da nossa rede`,
    `Auto socorro em ${cu}: o que esperar quando você liga`,
    `Guincho em ${c}: cobertura, tempo de chegada e tipos de veículo atendidos`,
    `Como funciona o serviço de guincho 24h em ${c} (passo a passo)`,
    `Reboque urbano e rodoviário em ${c}: o guia para quem precisa agora`,
    `Socorro mecânico em ${c}: muito além de só rebocar o carro`,
  ];

  const longIntros = [
    `Quebrar o carro nunca acontece na hora boa. Em ${cu}, a gente encurta esse problema mantendo uma malha de prestadores locais que conhecem cada avenida, viela e contorno da cidade. Isso reduz o tempo de chegada e evita aquele "estou indo" que nunca termina.`,
    `O socorro veicular em ${cu} mudou bastante nos últimos anos: hoje, em vez de procurar dezenas de telefones, você liga em um só número e a central decide qual parceiro está mais perto e melhor equipado para o seu caso. É essa logística que tentamos entregar todos os dias.`,
    `Trabalhamos em ${cu} com a lógica de reduzir atrito: você descreve a situação, recebe o orçamento, confirma e o guincho sai. Sem cadastro complicado, sem espera em URA, sem taxa "de deslocamento" que só aparece no fim do serviço.`,
    `Quem dirige em ${cu} sabe que pane não escolhe hora nem lugar — pode ser num semáforo do centro, na descida de uma rodovia ou na garagem de casa. Nossa proposta é responder rápido em qualquer um desses cenários, com o equipamento certo para o porte do veículo.`,
    `Atender ${cu} bem exige mais do que ter caminhonete e plataforma: exige conhecer o trânsito local, os horários de pico, os pontos de obra e os trechos de risco. Nossos parceiros são da região e isso encurta minutos preciosos em cada chamada.`,
    `A gente costuma dizer que socorro veicular em ${cu} é meio bombeiro, meio mecânico e meio motorista de táxi: precisa chegar rápido, entender o defeito e levar o carro inteiro até o destino. A central existe pra coordenar essas três pontas com o mínimo de fricção.`,
    `Cada chamado em ${cu} é único. A pane do Uber que precisa voltar a rodar hoje é diferente da batida que envolve seguro, que é diferente do caminhão que precisa de prancha rebaixada. Mapear isso na ligação inicial é o que nos faz acertar o despacho.`,
  ];

  const ctaTitles = [
    `Guincho 24h em ${c} a um clique de distância`,
    `Está parado em ${c}? Acione agora`,
    `Reboque em ${c}: ligue e resolva em minutos`,
    `Ainda tem dúvida? Fala com a gente em ${c}`,
    `Sem tempo a perder em ${c} — chame o guincho`,
    `Atendimento em ${c} agora mesmo, ligue já`,
    `Pronto para te socorrer em ${c} 24 horas`,
  ];

  // Pool de FAQs (≥16 perguntas) — escolhe 4 variações diferentes por cidade
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
      q: `Como pago o guincho em ${c}?`,
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
    {
      q: `Posso pedir guincho pra outra cidade saindo de ${c}?`,
      a: `Pode. Fazemos transporte intermunicipal e interestadual partindo de ${c} regularmente. O valor é calculado por quilômetro rodado e fechado antes do embarque.`,
    },
    {
      q: `Vocês aceitam seguradora ou só particular em ${c}?`,
      a: `Trabalhamos com particular e também com várias seguradoras e assistências 24h em ${c}. Se o seu seguro está demorando, chamar direto costuma ser mais rápido — depois você apresenta o recibo para reembolso.`,
    },
    {
      q: `Preciso estar com o carro quando o guincho chegar em ${c}?`,
      a: `O ideal é sim, principalmente para confirmar a entrega no destino. Mas em ${c} também atendemos retiradas com chave deixada em portaria, oficina ou pátio, desde que combinado por escrito.`,
    },
    {
      q: `Fazem auto socorro mecânico básico em ${c}?`,
      a: `Sim. Em ${c}, muitos chamados são resolvidos no local: troca de pneu, partida com bateria auxiliar, pequenos reparos elétricos e chaveiro automotivo. Quando não dá pra rodar, aí sim entra o guincho.`,
    },
    {
      q: `Pane seca: vocês levam combustível em ${c}?`,
      a: `Sim, levamos. Em ${c} entregamos combustível na via pública para você seguir até o posto mais próximo. É bem mais rápido (e mais barato) do que rebocar até um posto.`,
    },
    {
      q: `O carro está batido — vocês fazem remoção de sinistro em ${c}?`,
      a: `Fazemos. Em ${c} removemos veículos batidos, inclusive em situações com perda total, transferindo para o pátio, oficina ou destino indicado pela seguradora.`,
    },
    {
      q: `E se eu estiver em ${c} sem dinheiro na hora?`,
      a: `Combinamos por PIX ou cartão na chegada do guincho. Em ${c}, alguns parceiros aceitam pagamento parcial no embarque e parte na entrega — pergunte na ligação inicial.`,
    },
    {
      q: `Vocês emitem nota fiscal em ${c}?`,
      a: `Sim. Os prestadores cadastrados em ${c} emitem nota fiscal eletrônica para CPF ou CNPJ, útil para reembolso de seguro, frota de empresa ou abatimento contábil.`,
    },
    {
      q: `Posso acompanhar o transporte do meu carro em ${c}?`,
      a: `Pode. Em ${c} é comum o cliente subir junto na cabine do guincho até o destino, especialmente em traslados curtos dentro da cidade. Apenas confirme com o motorista para ajustar a logística.`,
    },
    {
      q: `Fazem transporte de veículo de leilão em ${c}?`,
      a: `Sim. Em ${c} retiramos veículos de pátios de leilão, DETRAN e seguradoras, com a documentação correta. Basta enviar o boleto pago, o auto de arremate e o RG do comprador.`,
    },
    {
      q: `Tem desconto pra distância curta dentro de ${c}?`,
      a: `Tem. Em ${c}, deslocamentos curtos (geralmente até 10–15 km) entram numa tarifa fixa mais baixa. Acima disso, o cálculo passa para preço por quilômetro rodado.`,
    },
    {
      q: `Quais documentos preciso ter em mãos em ${c}?`,
      a: `Em ${c}, basta ter um documento com foto e o CRLV do veículo (mesmo digital, pelo app da Carteira). Se for retirada de pátio, o boletim de ocorrência ou autorização do dono também ajudam.`,
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
