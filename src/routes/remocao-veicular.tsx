import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/remocao-veicular")({
  head: () => ({
    meta: [
      { title: "Remoção Veicular 24h | Sinistros, Leilões e Transporte Programado" },
      { name: "description", content: "Remoção veicular 24h para sinistros, leilões, mudanças interestaduais e transporte programado de veículos. Prancha rebaixada e cegonha disponíveis." },
      { property: "og:title", content: "Remoção Veicular 24h" },
      { property: "og:description", content: "Transporte programado de veículos para sinistros, leilões e frotistas." },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/remocao-veicular" }],
  }),
  component: () => (
    <ServicePage
      slug="remocao-veicular"
      serviceName="Remoção Veicular"
      schemaServiceType="TowingService"
      heroTitle="Remoção Veicular programada e emergencial 24 horas"
      heroSubtitle="Transporte de veículos sinistrados, arrematados em leilão, mudanças interestaduais e fretes especiais com prancha rebaixada e cegonha."
      intro={[
        "A <strong>remoção veicular</strong> vai além do reboque emergencial: é o serviço ideal para <strong>seguradoras</strong>, <strong>concessionárias</strong>, <strong>frotistas</strong>, <strong>arrematantes de leilão</strong> e <strong>particulares</strong> que precisam transportar um veículo de um ponto a outro com segurança documental e física. Trabalhamos com prancha rebaixada para esportivos, blindados, clássicos e veículos sem rodagem, e com cegonha para múltiplos veículos.",
        "Cobrimos rotas em <strong>todo o Brasil</strong>, com origem ou destino em <strong>São Paulo</strong>, <strong>Rio de Janeiro</strong>, <strong>Minas Gerais</strong>, <strong>Paraná</strong>, <strong>Santa Catarina</strong> e principais capitais. Emitimos nota fiscal, oferecemos <strong>seguro de carga</strong>, rastreamento durante o percurso e cumprimento rigoroso de prazos contratuais.",
      ]}
      features={[
        "Prancha rebaixada para esportivos e blindados",
        "Cegonha para 2 a 8 veículos",
        "Seguro de carga incluso",
        "Rastreamento em tempo real",
        "Nota fiscal e contrato de transporte",
        "Atendimento corporativo com SLA mensal",
      ]}
      whenToUse={[
        "Sinistro com encaminhamento para pátio de seguradora",
        "Veículo arrematado em leilão judicial ou DETRAN",
        "Mudança interestadual com transporte do carro",
        "Carro novo da concessionária ao cliente final",
        "Frota corporativa em transferência entre filiais",
        "Veículo sem rodagem (motor parado, sem roda)",
      ]}
      vehicles={["Carros de passeio", "SUVs", "Picapes", "Esportivos", "Blindados", "Clássicos", "Elétricos", "Caminhões leves", "Vans utilitárias"]}
      whatsappMsg="Olá! Preciso de remoção veicular, podem me ajudar?"
      faqs={[
        { q: "Atendem remoção interestadual?", a: "Sim. Realizamos transporte para qualquer estado do Brasil com nota fiscal e seguro de carga." },
        { q: "Posso acompanhar o transporte?", a: "Sim. Oferecemos rastreamento em tempo real durante todo o percurso." },
        { q: "Atendem leilão judicial?", a: "Sim. Trabalhamos com arrematantes de leilões DETRAN, judiciais e particulares, com toda documentação adequada." },
      ]}
    />
  ),
});
