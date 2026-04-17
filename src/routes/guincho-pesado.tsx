import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/guincho-pesado")({
  head: () => ({
    meta: [
      { title: "Guincho Pesado 24h para Caminhões, Ônibus e Máquinas | Reboque" },
      { name: "description", content: "Guincho pesado 24 horas para caminhões, ônibus, máquinas agrícolas e veículos acima de 8 toneladas. Equipamento robusto, operadores especializados em rodovias." },
      { property: "og:title", content: "Guincho Pesado 24h — Caminhões e Ônibus" },
      { property: "og:description", content: "Reboque pesado com guincho munk e prancha rebaixada, 24h." },
    ],
    links: [{ rel: "canonical", href: "https://guincho24hrs.com.br/guincho-pesado" }],
  }),
  component: () => (
    <ServicePage
      slug="guincho-pesado"
      serviceName="Guincho Pesado"
      schemaServiceType="TowingService"
      heroTitle="Guincho Pesado 24h para caminhões, ônibus e máquinas"
      heroSubtitle="Reboque profissional para veículos acima de 8 toneladas, com guincho munk, prancha rebaixada e operadores experientes em rodovia e serra."
      intro={[
        "O <strong>guincho pesado</strong> é o serviço destinado ao reboque de <strong>caminhões</strong>, <strong>ônibus</strong>, <strong>máquinas agrícolas</strong>, <strong>tratores</strong>, <strong>cavalos mecânicos</strong> e <strong>veículos acima de 8 toneladas</strong>. Trabalhamos com guincho munk articulado, prancha rebaixada e cegonha para garantir o transporte seguro mesmo em situações de tombamento, capotamento ou atolamento.",
        "Atendemos transportadoras, frotistas, seguradoras e motoristas autônomos em <strong>rodovias federais</strong> como Dutra (BR-116), Fernão Dias (BR-381), Régis Bittencourt e em todo o estado de São Paulo. Também realizamos <strong>resgates em descidas de serra</strong> (Tamoios, Oswaldo Cruz, Imigrantes) onde a expertise do operador faz toda a diferença.",
      ]}
      features={[
        "Guincho munk articulado de até 30 toneladas",
        "Prancha rebaixada para máquinas e veículos baixos",
        "Cegonha para múltiplos veículos",
        "Equipamento de desencalhe e içamento em capotamento",
        "Operadores com experiência em descida de serra e curva fechada",
        "Atendimento corporativo com SLA e faturamento mensal",
      ]}
      whenToUse={[
        "Caminhão ou ônibus quebrado em rodovia",
        "Capotamento ou tombamento de veículo de carga",
        "Atolamento de máquina ou trator",
        "Transporte programado de máquinas pesadas",
        "Pane em cavalo mecânico com ou sem carreta",
        "Remoção pós-acidente para pátios de seguradoras",
      ]}
      vehicles={["Caminhões 3/4", "Caminhões trucados", "Cavalos mecânicos", "Carretas", "Ônibus rodoviários", "Ônibus urbanos", "Tratores", "Máquinas agrícolas", "Empilhadeiras"]}
      whatsappMsg="Olá! Preciso de guincho pesado agora, podem me ajudar?"
      faqs={[
        { q: "Qual o peso máximo suportado?", a: "Operamos com equipamentos de até 30 toneladas. Para cargas maiores, articulamos múltiplos guinchos e munks." },
        { q: "Atendem capotamento de caminhão?", a: "Sim. Temos equipes especializadas em desencalhe, içamento e remoção pós-tombamento, com sinalização rodoviária completa." },
        { q: "Fazem transporte interestadual de caminhão?", a: "Sim. Cobramos por KM rodado e o veículo é entregue no endereço escolhido com nota fiscal." },
      ]}
    />
  ),
});
