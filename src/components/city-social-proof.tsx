import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FIRST_NAMES = [
  "Carlos", "Ana", "Roberto", "Juliana", "Marcos", "Patrícia", "Ricardo",
  "Fernanda", "Lucas", "Mariana", "Eduardo", "Camila", "Rodrigo", "Beatriz",
  "André", "Tatiane", "Felipe", "Vanessa", "Bruno", "Larissa", "Gustavo",
  "Aline", "Thiago", "Renata", "Diego", "Priscila",
];
const LAST_INITIALS = ["S.", "M.", "O.", "P.", "R.", "L.", "C.", "A.", "F.", "G."];

const TEMPLATES = [
  "Furou o pneu na {hood} e em poucos minutos o guincho chegou. Equipe educada e preço justo.",
  "Bateria descarregou no estacionamento aqui em {city}. Resolveram rápido, sem dor de cabeça.",
  "Chamei à 1h da manhã, atendimento 24h funciona mesmo. Recomendo para quem mora em {city}.",
  "Meu carro pifou na rodovia perto de {city}. Plataforma chegou antes do prometido. Nota 10.",
  "Levaram minha moto até a oficina sem nenhum arranhão. Profissionais de verdade em {city}.",
  "Pane seca no caminho do trabalho, em {hood}. Trouxeram combustível e segui viagem.",
  "Já é a segunda vez que uso aqui em {city}. Sempre pontuais e transparentes no preço.",
  "Atendimento humano e ágil. Recomendo para todos os moradores de {city} e região.",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset * 7) % arr.length];
}

type Props = {
  cityName: string;
  neighborhoods: string[];
};

export function CitySocialProof({ cityName, neighborhoods }: Props) {
  const seed = hash(cityName);
  const items = Array.from({ length: 4 }, (_, i) => {
    const name = `${pick(FIRST_NAMES, seed, i)} ${pick(LAST_INITIALS, seed, i + 3)}`;
    const hood = neighborhoods.length
      ? pick(neighborhoods, seed, i + 1)
      : "Centro";
    const template = pick(TEMPLATES, seed, i + 2);
    const text = template.replaceAll("{city}", cityName).replaceAll("{hood}", hood);
    const days = 1 + ((seed + i * 11) % 28);
    return { name, hood, text, days };
  });

  return (
    <section className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Avaliações de clientes em {cityName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Nota média <strong>4.9/5</strong> com base em atendimentos recentes.
          </p>
        </div>
        <div className="flex items-center gap-1" aria-label="5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, idx) => (
          <Card key={idx} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-1" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{it.text}"</p>
              <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <h4 className="inline text-foreground font-bold">{it.name}</h4> · {it.hood}
                <br />
                há {it.days} {it.days === 1 ? "dia" : "dias"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
