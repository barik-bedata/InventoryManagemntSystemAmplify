import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with fake categories and products...');

  // Delete existing data to avoid duplicates
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = [
    {
      title: 'Laptops',
      products: {
        create: [
          { title: 'MacBook Pro 16"', tag: 'Apple' },
          { title: 'Dell XPS 15', tag: 'Dell' },
          { title: 'ThinkPad X1 Carbon', tag: 'Lenovo' },
        ],
      },
    },
    {
      title: 'Smartphones',
      products: {
        create: [
          { title: 'iPhone 15 Pro Max', tag: 'Apple' },
          { title: 'Samsung Galaxy S24 Ultra', tag: 'Samsung' },
          { title: 'Google Pixel 8 Pro', tag: 'Google' },
        ],
      },
    },
    {
      title: 'Accessories',
      products: {
        create: [
          { title: 'AirPods Pro 2', tag: 'Audio' },
          { title: 'Logitech MX Master 3S', tag: 'Peripherals' },
          { title: 'Keychron K2', tag: 'Keyboard' },
        ],
      },
    },
  ];

  for (const cat of categories) {
    await prisma.category.create({
      data: cat,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
