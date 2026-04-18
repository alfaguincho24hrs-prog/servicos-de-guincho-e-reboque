import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/guincho-de-motos")({
  head: () => ({
    meta: [
      { title: "Guincho de Motos 24h | Reboque Seguro para Motocicletas" },
      { name: "description", content: "Guincho de motos 24 horas com içamento adequado, sem riscos para a pintura ou estrutura. Atendimento para motos esportivas, customizadas, scooters e clássicas." },
      { property: "og:title", content: "Guincho de Motos 24h" },
      { property: "og:description", content: "Reboque seguro para motocicletas com rampa e cintas específicas." },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/guincho-de-motos" }],
  }),
  component: () => (
    <ServicePage
      slug="guincho-de-motos"
      serviceName="Guincho de Motos"
      schemaServiceType="TowingService"
      heroTitle="Guincho de Motos 24h com içamento seguro e profissional"
      heroSubtitle="Reboque especializado para motocicletas de qualquer cilindrada, com rampa e cintas específicas que preservam pintura, suspensão e carenagem."
      intro={[
        "O <strong>guincho de motos</strong> exige equipamento e técnica específicos. Diferente de carros, motocicletas precisam ser transportadas em pé, com cintas em pontos exatos da estrutura para não danificar carenagem, escapamento, paralamas e suspensão. Nossos parceiros utilizam <strong>rampa de embarque</strong>, <strong>plataforma com trilho</strong> e <strong>cintas de catraca</strong> homologadas.",
        "Atendemos <strong>motos esportivas</strong>, <strong>nakeds</strong>, <strong>scooters</strong>, <strong>customizadas</strong>, <strong>big trails</strong>, <strong>motos clássicas</strong> e <strong>elétricas</strong>. Ideal para quedas, panes elétricas, problemas de partida, transporte para oficina e até mesmo viagens longas de moto que terminam de carro.",
      ]}
      features={[
        "Rampa de embarque hidráulica",
        "Plataforma com trilho central para fixação da roda dianteira",
        "Cintas de catraca em pontos seguros da estrutura",
        "Proteção em espuma para carenagem e tanque",
        "Atendimento para até 2 motos por viagem",
        "Disponível 24h em rodovias e cidades",
      ]}
      whenToUse={[
        "Queda ou tombamento de motocicleta",
        "Pane elétrica ou falta de partida",
        "Pneu furado em moto",
        "Transporte para oficina especializada",
        "Mudança ou transporte interestadual de moto",
        "Resgate de moto após viagem incompleta",
      ]}
      vehicles={["Motos esportivas", "Nakeds", "Scooters", "Customizadas", "Big trails", "Motos clássicas", "Elétricas", "Triciclos"]}
      whatsappMsg="Olá! Preciso de guincho de moto agora, podem me ajudar?"
      faqs={[
        { q: "O guincho danifica a moto?", a: "Não. Usamos rampa de embarque e cintas em pontos certificados. A moto é transportada em pé, sem tocar o solo." },
        { q: "Atendem motos esportivas baixas?", a: "Sim. Temos rampa com ângulo reduzido para esportivas com baixa altura do solo." },
        { q: "Posso transportar 2 motos juntas?", a: "Sim, dependendo do tamanho. Confirme pelo telefone para escolher a plataforma correta." },
      ]}
    />
  ),
});
