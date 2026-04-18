import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/auto-socorro")({
  head: () => ({
    meta: [
      { title: "Auto Socorro Mecânico 24h | Pequenos Reparos no Local" },
      { name: "description", content: "Auto socorro mecânico 24 horas: troca de pneu, partida de bateria, chaveiro automotivo e pequenos reparos no local da ocorrência. Sem precisar rebocar." },
      { property: "og:title", content: "Auto Socorro Mecânico 24h" },
      { property: "og:description", content: "Resolvemos sua emergência no local: bateria, pneu, chaveiro e mais." },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/auto-socorro" }],
  }),
  component: () => (
    <ServicePage
      slug="auto-socorro"
      serviceName="Auto Socorro Mecânico"
      schemaServiceType="AutoRepair"
      heroTitle="Auto Socorro Mecânico 24 horas — resolvemos no local"
      heroSubtitle="Troca de pneu, partida de bateria, chaveiro automotivo emergencial e pequenos reparos diretamente onde você está, sem necessidade de reboque."
      intro={[
        "O <strong>auto socorro mecânico</strong> é a forma mais rápida e barata de voltar a rodar. Em muitos casos, o problema do veículo pode ser resolvido <strong>no próprio local</strong> sem necessidade de guincho: bateria descarregada, pneu furado, chave trancada dentro do carro, fusível queimado, falta de combustível, fios soltos ou pequenos vazamentos.",
        "Nossos parceiros enviam um técnico equipado com chupetinha (booster), macaco hidráulico, chaves específicas, lanterna profissional, ferramentas de chaveiro e galões de combustível. O atendimento é feito em <strong>até 30 minutos</strong> em áreas urbanas e o pagamento pode ser feito por PIX, cartão ou dinheiro.",
      ]}
      features={[
        "Partida de bateria com chupetinha (booster)",
        "Troca de pneu furado com estepe próprio ou do cliente",
        "Chaveiro automotivo emergencial (abertura sem dano)",
        "Pequenos reparos elétricos (fusíveis, fios, lâmpadas)",
        "Diagnóstico inicial de pane mecânica",
        "Pagamento via PIX, cartão ou dinheiro",
      ]}
      whenToUse={[
        "Bateria descarregada no estacionamento ou rua",
        "Pneu furado sem ferramenta para troca",
        "Chave trancada dentro do veículo",
        "Lâmpada ou fusível queimado em viagem",
        "Pane elétrica simples sem necessidade de oficina",
        "Necessidade de diagnóstico antes de chamar guincho",
      ]}
      vehicles={["Carros de passeio", "SUVs", "Picapes", "Utilitários", "Vans", "Motos", "Caminhões leves"]}
      whatsappMsg="Olá! Preciso de auto socorro mecânico agora, podem me ajudar?"
      faqs={[
        { q: "Auto socorro é mais barato que guincho?", a: "Sim. Como não envolve reboque, o custo é menor — em média entre R$ 80 e R$ 200 dependendo do serviço." },
        { q: "Se não resolverem no local, mandam guincho?", a: "Sim. Caso o problema exija oficina, despachamos imediatamente o guincho mais próximo, sem cobrar a vinda do socorro inicial duas vezes." },
        { q: "Atendem chaveiro automotivo?", a: "Sim. Realizamos abertura emergencial sem dano à fechadura ou vidros, inclusive em carros com chave codificada." },
      ]}
    />
  ),
});
