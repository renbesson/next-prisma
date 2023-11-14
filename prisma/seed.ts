import { hash } from "bcrypt";
import prisma from "../lib/prisma";

async function main() {
  const password = await hash("password123", 12);
  const response = await Promise.all([
   /*  prisma.user.upsert({
      where: { email: "ren.besson@outlook.com" },
      update: {},
      create: {
        name: "Ren Besson",
        email: "ren.besson@outlook.com",
        password,
        image: "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg",
      },
    }), */
  ]);
  console.log(response);
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
