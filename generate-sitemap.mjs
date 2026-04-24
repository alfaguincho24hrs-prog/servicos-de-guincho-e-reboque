import fs from 'fs';
import path from 'path';

// This script needs to be able to import city data
// Since it's a .mjs file and the project is likely using TS,
// we might need to be careful. However, we can read the file as text 
// and extract the cities or use a pre-compiled version if available.
// Alternatively, we can define a small helper to parse the TS file for city data.

const SITE_URL = 'https://sosguincho24horas.com.br';
const ROUTES_DIR = './src/routes';

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getStaticRoutes = () => {
  const files = fs.readdirSync(ROUTES_DIR);
  return files
    .filter(file => 
      !file.startsWith('__') && 
      file.endsWith('.tsx') && 
      !file.includes('$slug') && 
      !file.includes('{$slug}') &&
      !['admin.tsx', 'anuncie.tsx'].includes(file)
    )
    .map(file => {
      const slug = file.replace('.tsx', '').replace('index', '');
      return slug === '' ? '/' : `/${slug}`;
    });
};

const getDynamicRoutes = () => {
  // Read cities-data.ts and extract cities
  const citiesDataContent = fs.readFileSync('./src/components/cities-data.ts', 'utf-8');
  
  // We'll use regex to find arrays of cities [ "Name", "UF" ]
  const cityRegex = /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]/g;
  const cities = [];
  let match;
  
  while ((match = cityRegex.exec(citiesDataContent)) !== null) {
    const name = match[1];
    const uf = match[2];
    const slug = slugify(name);
    cities.push({ name, uf, slug });
  }

  // Also extract blog posts if any (from blog-data.ts)
  const blogRoutes = [];
  if (fs.existsSync('./src/components/blog-data.ts')) {
    const blogDataContent = fs.readFileSync('./src/components/blog-data.ts', 'utf-8');
    const blogSlugRegex = /slug:\s*"([^"]+)"/g;
    let blogMatch;
    while ((blogMatch = blogSlugRegex.exec(blogDataContent)) !== null) {
      blogRoutes.push(`/blog/${blogMatch[1]}`);
    }
  }

  return [
    ...cities.map(city => `/guincho-em-${city.slug}-${city.uf.toLowerCase()}`),
    ...blogRoutes
  ];
};

const generateSitemap = (routes) => {
  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${now.split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('guincho-em') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log(`✅ Sitemap generated with ${routes.length} routes.`);
};

const generateRobots = () => {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync('./public/robots.txt', content);
  console.log('✅ robots.txt generated.');
};

const run = () => {
  const staticRoutes = getStaticRoutes();
  const dynamicRoutes = getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  
  // Ensure public directory exists
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  generateSitemap(allRoutes);
  generateRobots();

  // Validation
  if (dynamicRoutes.length < 100) {
    console.error('❌ Validation failed: Not enough dynamic routes found. Check cities-data.ts parsing.');
    process.exit(1);
  }
};

run();
