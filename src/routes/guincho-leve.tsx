import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/guincho-leve")({
  head: () => ({
    meta: [
      { title: "Guincho Leve 24h para Carros e SUVs | Reboque Rápido com Plataforma" },
      { name: "description", content: "Guincho leve 24 horas para carros de passeio, SUVs, picapes e utilitários até 3,5 t. Plataforma hidráulica, atendimento rápido em toda cidade e rodovia." },
      { property: "og:title", content: "Guincho Leve 24h — Reboque para Carros e SUVs" },
      { property: "og:description", content: "Plataforma hidráulica, atendimento 24h em todo o Brasil." },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/guincho-leve" }],
  }),
  component: () => (
    <ServicePage
      slug="guincho-leve"
      serviceName="Guincho Leve"
      schemaServiceType="TowingService"
      heroTitle="Guincho Leve 24 horas para carros, SUVs e utilitários"
      heroSubtitle="Reboque rápido com plataforma hidráulica para veículos até 3,5 toneladas, com atendimento ininterrupto em toda a cidade e rodovias."
      intro={[
        "O <strong>guincho leve</strong> é o serviço mais solicitado de <strong>reboque 24 horas</strong>, indicado para <strong>carros de passeio</strong>, <strong>SUVs</strong>, <strong>picapes pequenas</strong>, <strong>hatches</strong>, <strong>sedans</strong> e <strong>utilitários até 3,5 toneladas</strong>. Operamos com plataformas hidráulicas modernas que içam o veículo do solo, evitando desgaste em câmbio, suspensão e diferencial.",
        "Atendemos panes mecânicas, batidas, pneus furados sem estepe, problemas elétricos, falta de combustível e qualquer situação que impeça o veículo de seguir viagem. Nossa rede de parceiros está presente em <strong>São Paulo</strong>, <strong>Vale do Paraíba</strong>, <strong>Litoral Norte</strong>, <strong>Grande SP</strong>, <strong>ABC</strong>, <strong>Campinas</strong>, <strong>Sorocaba</strong> e em todas as principais capitais do Brasil.",
      ]}
      features={[
        "Plataforma hidráulica com piso antiderrapante",
        "Cintas certificadas para fixação sem dano à pintura",
        "Sinalização rodoviária completa para emergências em via pública",
        "Operadores treinados em condução em descidas de serra",
        "Atendimento em rodovias federais e estaduais (BR-116, SP-070, SP-099, SP-330)",
        "Cobertura urbana 24h em todos os bairros",
      ]}
      whenToUse={[
        "Pane mecânica ou elétrica em via pública",
        "Acidente de trânsito com veículo imobilizado",
        "Pneu furado sem estepe ou estepe vencido",
        "Bateria descarregada sem possibilidade de partida",
        "Embreagem queimada ou problemas no câmbio",
        "Superaquecimento de motor em rodovia",
      ]}
      vehicles={["Carros hatch", "Sedans", "SUVs", "Picapes pequenas", "Utilitários até 3,5 t", "Veículos elétricos", "Carros importados"]}
      whatsappMsg="Olá! Preciso de guincho leve agora, podem me ajudar?"
      faqs={[
        { q: "Qual o limite de peso do guincho leve?", a: "Até 3,5 toneladas. Acima disso, indicamos guincho médio (asa-delta) ou pesado." },
        { q: "Pode rebocar carro elétrico ou híbrido?", a: "Sim. Carros elétricos e híbridos devem ser transportados com plataforma (rodas fora do solo) e nossos guinchos leves estão preparados para isso." },
        { q: "Quanto custa um guincho leve?", a: "Em média entre R$ 150 e R$ 350 dentro da cidade, mais KM rodado em rodovia. Sempre informamos o orçamento antes de iniciar." },
      ]}
    />
  ),
});
