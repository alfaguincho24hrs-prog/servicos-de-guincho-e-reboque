import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/pane-seca")({
  head: () => ({
    meta: [
      { title: "Pane Seca 24h | Entrega de Combustível na Rodovia ou Cidade" },
      { name: "description", content: "Acabou a gasolina, etanol ou diesel? Entregamos combustível emergencial 24h na rodovia ou na cidade. Sem multa, sem espera, sem precisar empurrar o carro." },
      { property: "og:title", content: "Pane Seca 24h — Entrega de Combustível" },
      { property: "og:description", content: "Combustível emergencial entregue onde você está, 24 horas." },
    ],
    links: [{ rel: "canonical", href: "https://guincho24hrs.com.br/pane-seca" }],
  }),
  component: () => (
    <ServicePage
      slug="pane-seca"
      serviceName="Pane Seca"
      schemaServiceType="EmergencyService"
      heroTitle="Pane Seca 24h — combustível entregue onde você está"
      heroSubtitle="Acabou a gasolina, etanol ou diesel? Levamos combustível emergencial até o seu veículo na rodovia ou na cidade, com atendimento ininterrupto."
      intro={[
        "<strong>Pane seca</strong> é uma das emergências mais comuns nas rodovias brasileiras. Tentar empurrar o veículo ou pegar carona até o posto pode ser perigoso e ainda gerar <strong>multa por estacionamento em local proibido</strong>. Nosso serviço entrega <strong>gasolina comum</strong>, <strong>gasolina aditivada</strong>, <strong>etanol</strong> ou <strong>diesel S10/S500</strong> em galões lacrados e certificados, direto no seu carro.",
        "O atendimento de pane seca chega normalmente em <strong>30 a 60 minutos</strong>, com sinalização rodoviária completa para sua segurança. Disponível em <strong>todo o estado de São Paulo</strong>, principais rodovias do Vale do Paraíba, Litoral Norte, Grande SP e em mais de 1.000 cidades do Brasil.",
      ]}
      features={[
        "Gasolina comum, aditivada e premium",
        "Etanol hidratado",
        "Diesel S10 e S500",
        "Galões lacrados com nota fiscal",
        "Sinalização de segurança no local",
        "Atendimento em rodovia e área urbana",
      ]}
      whenToUse={[
        "Marcador chegou no zero em viagem",
        "Carro parou em local sem posto próximo",
        "Caminhão diesel sem combustível em rodovia",
        "Frota com veículo parado por falta de abastecimento",
        "Emergência em horário noturno sem postos abertos",
        "Necessidade de pequeno volume para chegar ao posto",
      ]}
      vehicles={["Carros flex", "Carros a gasolina", "Carros a etanol", "Diesel leve", "Caminhões a diesel", "Motos", "Vans"]}
      whatsappMsg="Olá! Estou em pane seca, podem entregar combustível?"
      faqs={[
        { q: "Qual a quantidade mínima de combustível?", a: "Normalmente entregamos a partir de 5 litros — o suficiente para chegar ao posto mais próximo." },
        { q: "Quanto custa o serviço de pane seca?", a: "Cobramos a taxa de deslocamento + o preço do combustível com nota fiscal. Sempre informamos o valor antes." },
        { q: "Atendem caminhão a diesel em rodovia?", a: "Sim. Levamos diesel S10 ou S500 conforme a necessidade do veículo." },
      ]}
    />
  ),
});
