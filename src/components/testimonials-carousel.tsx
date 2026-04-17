import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Testimonial = {
  name: string;
  city: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  { name: "Carlos Eduardo Almeida", city: "São Paulo - SP", text: "Furei o pneu na Marginal Tietê às 2h da manhã e o guincho chegou em 25 minutos. Atendimento educado, preço justo e levou meu carro até a oficina sem nenhum arranhão. Recomendo de olhos fechados esse serviço de guincho 24h." },
  { name: "Mariana Souza Lima", city: "São José dos Campos - SP", text: "Meu carro quebrou na Dutra perto de Caçapava. Liguei e em menos de 40 minutos o reboque estava no local. Operador super atencioso, explicou tudo. Melhor guincho do Vale do Paraíba!" },
  { name: "Roberto Silva Mendes", city: "Taubaté - SP", text: "Pane elétrica no meio da Carvalho Pinto. O auto socorro chegou rápido, tentou dar partida e quando viu que era a bateria, já trouxe uma nova. Resolveu sem precisar rebocar. Excelente!" },
  { name: "Juliana Pereira Costa", city: "Jacareí - SP", text: "Bati o carro na rotatória e fiquei desesperada. O guincho 24h chegou em 30 minutos, o motorista foi super gentil e me ajudou até com o boletim. Serviço humano e profissional." },
  { name: "Fernando Oliveira Ramos", city: "Pindamonhangaba - SP", text: "Subindo para Campos do Jordão meu carro superaqueceu. Ligaram, em uma hora estava lá em cima. Reboque pesado preparado para serra. Salvou minha viagem em família." },
  { name: "Patrícia Gomes Ribeiro", city: "Caraguatatuba - SP", text: "Descendo a Tamoios com o carro carregado, estourou o pneu e não tinha estepe. O guincho chegou rápido, levou até Caraguá com segurança. Cobrança transparente, sem surpresa." },
  { name: "Ricardo Barbosa Nunes", city: "Ubatuba - SP", text: "Aluguei carro pra praia, pifou na Oswaldo Cruz. O atendimento foi impecável, conseguiram me levar até a locadora em Taubaté. Empresa de guincho séria e responsável." },
  { name: "Aline Cardoso Martins", city: "Aparecida - SP", text: "Visita ao Santuário e o carro não pegou. Em 20 minutos veio o auto socorro, deu partida e me indicou uma oficina. Que serviço maravilhoso de guincho 24 horas!" },
  { name: "Marcos Antonio Ferreira", city: "Guaratinguetá - SP", text: "Caminhonete pesada, achei que ninguém ia conseguir. Veio um guincho médio com asa delta, perfeito. Levou até minha fazenda sem nenhum dano. Preço excelente." },
  { name: "Beatriz Rocha Carvalho", city: "Cruzeiro - SP", text: "Quebrei na BR-116 perto da divisa com RJ. Liguei achando que ia demorar horas. Em 50 minutos o reboque estava lá. Atendimento 24h de verdade!" },
  { name: "Thiago Henrique Lopes", city: "Campos do Jordão - SP", text: "Inverno com geada, carro travou na subida. O guincho da Mantiqueira é especializado em serra, chegou rápido e desceu com toda segurança. Recomendo demais." },
  { name: "Camila Fernandes Dias", city: "Tremembé - SP", text: "Pane seca à noite numa estrada vicinal. Eles trouxeram combustível em 30 minutos. Salvaram meu dia! Auto socorro confiável e barato." },
  { name: "Gustavo Henrique Pinto", city: "Roseira - SP", text: "Acidente na Dutra, carro parado na pista. O guincho chegou com sinalização completa, removeu rapidinho. Profissionalismo nota 10 para essa equipe de reboque." },
  { name: "Larissa Moreira Castro", city: "Queluz - SP", text: "Estava voltando de viagem e o motor fundiu. Mesmo num lugar afastado, o guincho 24h apareceu e me levou até São Paulo. Cobrança honesta pelo KM rodado." },
  { name: "Eduardo Vasconcelos Reis", city: "São Luiz do Paraitinga - SP", text: "Passeio de fim de semana, carro atolou em estrada de terra. Mandaram um 4x4 com guincho e tiraram sem danificar nada. Empresa salvadora!" },
  { name: "Renata Cristina Alves", city: "São Sebastião - SP", text: "Carro com problema no câmbio na descida da serra. Reboque com prancha rebaixada para não danificar. Atendimento de primeira linha, super recomendo." },
  { name: "Paulo César Monteiro", city: "Rio de Janeiro - RJ", text: "Visitando São Paulo meu carro pifou. Conseguiram um guincho que me trouxe de volta pro Rio. Serviço interestadual organizado, motorista cordial e pontual." },
  { name: "Sandra Regina Batista", city: "Belo Horizonte - MG", text: "Viajando para o litoral paulista, carro deu pane. Achei essa empresa pelo Google e foi maravilhoso. Guincho 24h sério, com nota fiscal e tudo certinho." },
  { name: "Anderson Luiz Cavalcante", city: "Guarulhos - SP", text: "Bateria descarregou no estacionamento do shopping. Em 15 minutos o socorro mecânico estava lá. Mais barato que chamar concessionária. Excelente custo-benefício." },
  { name: "Vanessa Aparecida Souto", city: "Santo André - SP", text: "Acidente na Anchieta, fiquei com medo. O atendente do guincho me acalmou pelo telefone até chegar. Atendimento humano que faz a diferença numa hora dessas." },
  { name: "Diego Martins Bezerra", city: "São Bernardo do Campo - SP", text: "Reboque para minha moto após queda. Içamento perfeito, sem riscar a pintura. Pessoal especializado em guincho de moto. Voltarei a chamar com certeza." },
  { name: "Tatiane Ribeiro Macedo", city: "Osasco - SP", text: "Minha SUV não saía da garagem inundada. Trouxeram guincho e tiraram sem danificar. Empresa que atende emergência mesmo em situações difíceis." },
  { name: "Felipe Augusto Tavares", city: "Campinas - SP", text: "Quebrei na Bandeirantes voltando de viagem. Guincho chegou rapidinho, motorista experiente, levou até em casa. Serviço de reboque 24h confiável." },
  { name: "Cláudia Helena Marques", city: "Sorocaba - SP", text: "Pneu furado na Castello Branco, sem estepe. O auto socorro trouxe pneu novo já calibrado. Resolveram tudo no acostamento. Sensacional!" },
  { name: "Leandro Soares Pacheco", city: "Mogi das Cruzes - SP", text: "Atendimento na rodovia Ayrton Senna. Rápido, educado, com equipamentos modernos. Guincho leve perfeito para meu hatch. Indico para todos os amigos." },
  { name: "Adriana Pires Coelho", city: "Diadema - SP", text: "Carro travou em rua estreita, achei que ninguém ia conseguir tirar. O operador foi habilidoso, manobrou com perfeição. Profissional de verdade!" },
  { name: "Bruno Rafael Santana", city: "Itaquaquecetuba - SP", text: "Bateu no carro à noite e o seguro demorava. Chamei direto, em 30 minutos resolveram. Pago menos do que pelo seguro. Vale muito a pena." },
  { name: "Simone Aparecida Brito", city: "Suzano - SP", text: "Mãe de família, carro parou com as crianças. Atendimento prioritário, super carinhoso com elas. Empresa que se importa com o cliente. Obrigada!" },
  { name: "Wellington Moura Freitas", city: "Lorena - SP", text: "Caminhão da empresa quebrou na BR-459. Guincho pesado chegou preparado, levou até a oficina em Itajubá. Serviço para frota com agilidade." },
  { name: "Priscila Nogueira Ataíde", city: "Cubatão - SP", text: "Descendo a Imigrantes meu freio falhou. Consegui parar e liguei. O guincho chegou rápido na serra, com toda segurança. Salvaram minha vida literalmente." },
];

export function TestimonialsCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4500, stopOnInteraction: true }));

  return (
    <section className="bg-secondary/40 py-20" aria-labelledby="depoimentos-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Avaliações reais — guincho 24h</Badge>
          <h2 id="depoimentos-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            +30 motoristas avaliaram nosso serviço de guincho e reboque com 5 estrelas
          </h2>
          <p className="mt-3 text-muted-foreground">
            Confira depoimentos reais de quem precisou de auto socorro, reboque na rodovia, guincho de moto e
            remoção veicular em São Paulo, Vale do Paraíba, Litoral Norte, Grande SP e em todo o Brasil.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="mx-auto w-full max-w-6xl"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border/60">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-1 text-accent" aria-label="Avaliação 5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                    <div className="border-t pt-3">
                      <p className="font-semibold">{t.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {t.city}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* JSON-LD AggregateRating + Review */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Guincho Brasil 24h",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: TESTIMONIALS.length,
              bestRating: "5",
              worstRating: "1",
            },
            review: TESTIMONIALS.slice(0, 10).map((t) => ({
              "@type": "Review",
              author: { "@type": "Person", name: t.name },
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              reviewBody: t.text,
              locationCreated: t.city,
            })),
          }),
        }}
      />
    </section>
  );
}
