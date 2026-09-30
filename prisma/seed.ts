import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  // Limpiar datos existentes
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // Crear Tenants
  const tenant1 = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });
  const tenant2 = await prisma.tenant.create({
    data: { name: 'Marketing Pro' },
  });

  // Crear Usuarios
const hashedPassword = 'password123';
  
  await prisma.user.create({
    data: {
      email: 'admin@tech.com',
      name: 'Admin Tech',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: tenant1.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@marketing.com',
      name: 'User Marketing',
      password: hashedPassword,
      role: 'USER',
      tenantId: tenant2.id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });