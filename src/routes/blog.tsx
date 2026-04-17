import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Dicas de Guincho, Reboque e Auto Socorro | Guincho Brasil 24h" },
      { name: "description", content: "Artigos e guias sobre guincho 24h, reboque, auto socorro, segurança nas rodovias e cuidados com seu veículo em emergências." },
      { property: "og:title", content: "Blog — Guincho Brasil 24h" },
      { property: "og:description", content: "Dicas, guias e novidades sobre guincho, reboque e auto socorro em todo o Brasil." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    slug: "como-escolher-guincho-confiavel",
    title: "Como escolher um guincho confiável em 2026",
    excerpt: "Descubra os critérios essenciais para contratar um serviço de guincho seguro, rápido e com preço justo na sua cidade.",
    date: "12 de abril de 2026",
    category: "Guias",
  },
  {
    slug: "diferenca-guincho-leve-pesado",
    title: "Qual a diferença entre guincho leve e guincho pesado?",
    excerpt: "Entenda quando contratar cada tipo de guincho, a capacidade de carga, equipamentos usados e os principais cenários.",
    date: "05 de abril de 2026",
    category: "Tipos de Serviço",
  },
  {
    slug: "o-que-fazer-pane-rodovia",
    title: "O que fazer em caso de pane na rodovia",
    excerpt: "Passo a passo de segurança: sinalização, posicionamento do veículo, acionamento do guincho e cuidados com a sua segurança.",
    date: "28 de março de 2026",
    category: "Segurança",
  },
  {
    slug: "guincho-de-motos-cuidados",
    title: "Guincho de motos: cuidados para um transporte seguro",
    excerpt: "Saiba como o içamento correto evita arranhões, danos na suspensão e mantém sua moto íntegra durante o transporte.",
    date: "20 de março de 2026",
    category: "Motos",
  },
  {
    slug: "pane-seca-como-evitar",
    title: "Pane seca: como evitar e o que fazer quando acontece",
    excerpt: "Dicas práticas para nunca ficar sem combustível e como acionar entrega emergencial caso aconteça.",
    date: "10 de março de 2026",
    category: "Dicas",
  },
  {
    slug: "remocao-veicular-sinistro",
    title: "Remoção veicular após sinistro: como funciona",
    excerpt: "Entenda o processo de remoção de veículos sinistrados, documentação necessária e prazos típicos.",
    date: "01 de março de 2026",
    category: "Remoção",
  },
];

function BlogPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border/60 bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog Guincho Brasil 24h</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dicas, guias e novidades sobre guincho, reboque, auto socorro e segurança nas rodovias.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Card key={post.slug} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded bg-accent/10 px-2 py-0.5 font-medium text-accent">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                <CardDescription className="mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="ghost" size="sm" className="px-0 text-accent hover:bg-transparent hover:text-accent/80">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold">Precisa de guincho agora?</h2>
          <p className="mt-2 text-muted-foreground">Atendimento 24 horas em todo o Brasil.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/cobertura">Ver cobertura</Link></Button>
            <Button asChild variant="outline"><Link to="/contato">Falar conosco</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
