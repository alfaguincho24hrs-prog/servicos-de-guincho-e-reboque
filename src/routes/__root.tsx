import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalNotice } from "@/components/legal-notice";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Guincho e Reboque 24 horas |  Guincho em Todo o Brasil" },
      { name: "description", content: "Portal nacional de guincho e reboque 24 horas. Encontre empresas de auto socorro qualificadas na sua cidade. Atendimento rápido em rodovias e área urbana." },
      { name: "author", content: "Guincho Brasil 24h" },
      { name: "keywords", content: "guincho 24 horas, reboque, auto socorro, guincho perto de mim, guincho rodovia, guincho leve, guincho pesado, reboque de moto" },
      { property: "og:title", content: "Guincho e Reboque 24 horas |  Guincho em Todo o Brasil" },
      { property: "og:description", content: "Portal nacional de guincho e reboque 24 horas. Encontre empresas de auto socorro qualificadas na sua cidade. Atendimento rápido em rodovias e área urbana." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Guincho e Reboque 24 horas |  Guincho em Todo o Brasil" },
      { name: "twitter:description", content: "Portal nacional de guincho e reboque 24 horas. Encontre empresas de auto socorro qualificadas na sua cidade. Atendimento rápido em rodovias e área urbana." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <LegalNotice />
      <SiteFooter />
      <WhatsAppFloat />
      <Toaster />
    </div>
  );
}
