import {
  Prisma,
  PrismaClient,
  SocialDataType,
  SocialStatus,
  SocialType,
} from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  const social = await prisma.social.create({
    data: <Prisma.SocialCreateInput>{
      social_type: SocialType.feed,
      data_type: SocialDataType.text,
      content: "string",
      description: "string",
      status: SocialStatus.draft,
    },
  });

  const array = new Array(10).fill(0);

  await Promise.all(
    array.map(async (_, i) => {
      return await prisma.$queryRaw`UPDATE socials set user_likes = user_likes || hll_hash_any(${
        i % 2
      }) where id = CAST(${social.id}::text AS UUID)`;
    })
  );

  const result = await prisma.$queryRaw<
    [
      {
        user_likes: number;
      }
    ]
  >`SELECT #user_likes as user_likes FROM socials where id = CAST(${social.id}::text AS UUID) limit 1;`;
  console.log("result: ", result[0].user_likes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
