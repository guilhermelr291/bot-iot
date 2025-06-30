const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (!existing) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        password: hashed,
      },
    });
    console.log('✅ Admin criado com sucesso!');
  } else {
    console.log('ℹ️ Admin já existe. Nenhuma ação necessária.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
