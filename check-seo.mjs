
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
    let canonicalCorrect = content.includes(`href: "${expectedCanonical}"`);
    
    // Especial case for dynamic routes
    if (file === 'blog.$slug.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('blog/${params.slug}');
    }
    if (file === 'guincho-em-{$slug}.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('guincho-em-${city.slug}-${city.uf.toLowerCase()}');
    }

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
  
  const errors = results.filter(r => r.status === '❌ ERROR');
  if (errors.length > 0) {
    console.error(`\n❌ SEO Check failed: ${errors.length} route(s) have issues.`);
    process.exit(1);
  } else {
    console.log('\n✅ SEO Check passed for all routes!');
    process.exit(0);
  }
};

checkRoutes();
