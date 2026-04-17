import { createFileRoute } from "@tanstack/react-router";
import { ALL_CITIES } from "@/components/cities-data";

const SITE_URL = "https://guincho24hrs.com.br";

const STATIC_ROUTES = [
  "/",
  "/servicos",
  "/cobertura",
  "/anuncie",
  "/contato",
  "/servicos-de-guincho-e-reboque",
  "/rodovias-vale-do-paraiba",
  "/guincho-leve",
  "/guincho-pesado",
  "/guincho-de-motos",
  "/auto-socorro",
  "/pane-seca",
  "/remocao-veicular",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];

        const urls: string[] = [];

        for (const path of STATIC_ROUTES) {
          urls.push(
            `<url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`
          );
        }

        for (const city of ALL_CITIES) {
          const slug = `${city.slug}-${city.uf.toLowerCase()}`;
          urls.push(
            `<url><loc>${SITE_URL}/guincho-em-${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
          );
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
