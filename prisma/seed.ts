const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient({
  datasourceUrl: "file:./dev.db"
});

async function main() {
  console.log('Starting seed...');

  const categoriesPath = path.join(__dirname, '../scraped_categories.json');
  const productsPath = path.join(__dirname, '../all_scraped_products.json');

  if (!fs.existsSync(categoriesPath) || !fs.existsSync(productsPath)) {
    console.error('Scraped data files not found. Run scraper first.');
    return;
  }

  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`Found ${categoriesData.length} categories and ${productsData.length} products.`);

  // 1. Create Categories
  console.log('Creating categories...');
  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: {
        name: cat.name,
        slug: cat.slug,
      },
    });
  }

  // 2. Create Products
  console.log('Creating products...');
  for (const prod of productsData) {
    if (!prod.name || !prod.slug) continue;

    let categoryId = null;
    
    // Find category ID
    if (prod.categories && prod.categories.length > 0) {
      const cat = await prisma.category.findUnique({
        where: { slug: prod.categories[0].slug }
      });
      if (cat) categoryId = cat.id;
    }

    if (!categoryId) {
      const parentCat = categoriesData.find((c: any) => c.products.includes(prod.slug));
      if (parentCat) {
        const cat = await prisma.category.findUnique({
          where: { slug: parentCat.slug }
        });
        if (cat) categoryId = cat.id;
      }
    }

    if (!categoryId) {
        const misc = await prisma.category.upsert({
            where: { slug: 'other-tools' },
            update: {},
            create: { name: 'Other Tools', slug: 'other-tools' }
        });
        categoryId = misc.id;
    }

    await prisma.tool.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        tagline: prod.tagline,
        description: prod.description,
        logoUrl: prod.logo_url,
        mainImageUrl: prod.main_image_url,
        websiteUrl: prod.website_url || '',
        categoryId: categoryId,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        tagline: prod.tagline,
        description: prod.description,
        logoUrl: prod.logo_url,
        mainImageUrl: prod.main_image_url,
        websiteUrl: prod.website_url || '',
        categoryId: categoryId,
      },
    });
  }

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
