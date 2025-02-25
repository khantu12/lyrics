import prisma from '@/lib/prisma';

const Page = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return <div>Page</div>;
};

export default Page;
