
import fs from 'fs';
import path from 'path';

const ROUTES_DIR = './src/routes';
const COMPONENTS_DIR = './src/components';
const SITE_URL = 'https://sosguincho24horas.com.br';

const checkRoutes = () => {
  const files = fs.readdirSync(ROUTES_DIR);
  const results = [];

  // Also read ServicePage component to check schema pattern
  const servicePagePath = path.join(COMPONENTS_DIR, 'service-page.tsx');
  const servicePageContent = fs.existsSync(servicePagePath) ? fs.readFileSync(servicePagePath, 'utf-8') : '';

  files.forEach(file => {
    if (file.startsWith('__') || !file.endsWith('.tsx') || file === 'admin.tsx' || file === 'anuncie.tsx' || file === 'contato.tsx') return;

    const content = fs.readFileSync(path.join(ROUTES_DIR, file), 'utf-8');
    const slug = file.replace('.tsx', '').replace('index', '');
    const routePath = slug === '' ? '/' : `/${slug}`;
    const expectedCanonical = `${SITE_URL}${routePath === '/' ? '' : routePath}`;

    const hasTitle = content.includes('title:');
    const hasDescription = content.includes('name: "description"');
    const hasCanonical = content.includes('rel: "canonical"');
    
    let canonicalCorrect = content.includes(`href: "${expectedCanonical}"`);
    let schemaValid = false;

    // Especial case for dynamic routes
    if (file === 'blog.$slug.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('blog/${params.slug}');
    }
    if (file === 'guincho-em-{$slug}.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('guincho-em-${city.slug}-${city.uf.toLowerCase()}');
    }

    // Schema Validation
    if (file === 'index.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') && 
                    content.includes('"@id": `https://sosguincho24horas.com.br/index.html`') &&
                    content.includes('"url": `https://sosguincho24horas.com.br/`');
    } else if (file === 'guincho-em-{$slug}.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') && 
                    content.includes('SOS Guincho 24 horas - ${city.name}') &&
                    content.includes('`https://sosguincho24horas.com.br/guincho-em-${city.slug}-${city.uf.toLowerCase()}.html`');
    } else if (['auto-socorro.tsx', 'guincho-leve.tsx', 'guincho-pesado.tsx', 'pane-seca.tsx', 'remocao-veicular.tsx', 'guincho-de-motos.tsx'].includes(file)) {
      // These use ServicePage component
      schemaValid = servicePageContent.includes('"@type": "LocalBusiness"') &&
                    servicePageContent.includes('SOS Guincho 24 horas - ${p.serviceName}') &&
                    servicePageContent.includes('`https://sosguincho24horas.com.br/${p.slug}.html`');
    } else if (file === 'cobertura.tsx' || file === 'servicos-de-guincho-e-reboque.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') &&
                    content.includes('.html') &&
                    content.includes('SOS Guincho 24 horas');
    } else {
      // Fallback for other pages or if schema is not expected
      schemaValid = true; 
    }

    // Check for placeholders [NOME DA CIDADE]
    const hasPlaceholders = content.includes('[NOME DA CIDADE]') || content.includes('[nome-da-cidade]');

    results.push({
      route: routePath,
      hasTitle,
      hasDescription,
      hasCanonical,
      canonicalCorrect,
      schemaValid: schemaValid && !hasPlaceholders,
      status: (hasTitle && hasDescription && hasCanonical && canonicalCorrect && schemaValid && !hasPlaceholders) ? '✅ OK' : '❌ ERROR'
    });
  });

  console.table(results);
  
  const errors = results.filter(r => r.status === '❌ ERROR');
  if (errors.length > 0) {
    console.error(`\n❌ SEO/Schema Check failed: ${errors.length} route(s) have issues.`);
    process.exit(1);
  } else {
    console.log('\n✅ SEO and Schema Check passed for all routes!');
    process.exit(0);
  }
};

checkRoutes();
