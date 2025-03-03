import { auth } from '../auth';

export default async function Account() {
  const session = await auth();

  return <div>{session?.user?.email}</div>;
}
