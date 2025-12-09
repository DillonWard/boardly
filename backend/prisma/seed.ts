import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = await argon2.hash('admin');
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      firstName: 'Default',
      lastName: 'User',
      email,
      role: 'admin',
      password,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
