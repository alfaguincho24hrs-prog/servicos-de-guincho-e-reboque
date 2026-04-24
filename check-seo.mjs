
import fs from 'fs';
import path from 'path';

const ROUTES_DIR = './src/routes';
const SITE_URL = 'https://sosguincho24horas.com.br';

const checkRoutes = () => {
  const files = fs.readdirSync(ROUTES_DIR);
  const results = [];

  files.forEach(file => {
    if (file.startsWith('__') || !file.endsWith('.tsx') || file === 'admin.tsx') return;

    const content = fs.readFileSync(path.join(ROUTES_DIR, file), 'utf-8');
    const slug = file.replace('.tsx', '').replace('index', '');
    const routePath = slug === '' ? '/' : `/${slug}`;
    const expectedCanonical = `${SITE_URL}${routePath === '/' ? '' : routePath}`;

    const hasTitle = content.includes('title:');
    const hasDescription = content.includes('name: "description"');
    const hasCanonical = content.includes('rel: "canonical"');
    const canonicalCorrect = content.includes(`href: "${expectedCanonical}"`);

    results.push({
      route: routePath,
      hasTitle,
      hasDescription,
      hasCanonical,
      canonicalCorrect,
      status: (hasTitle && hasDescription && hasCanonical && canonicalCorrect) ? '✅ OK' : '❌ ERROR'
    });
  });

  console.table(results);
};

checkRoutes();
