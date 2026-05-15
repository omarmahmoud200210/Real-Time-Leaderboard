import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const GAMES = [
  'Speed Typer',
  'Math Blitz',
  'Word Battle',
  'Trivia Royale',
  'Chess Online',
];

async function main() {
  const existing = await prisma.game.count();
  if (existing > 0) {
    console.log(`Skipping seed — ${existing} game(s) already exist.`);
    return;
  }

  await prisma.game.createMany({ data: GAMES.map((name) => ({ name })) });
  console.log(`Seeded ${GAMES.length} games.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
