import LoginedMain from '@/components/LoginedMain';
import NotLogined from '@/components/NotLoginedMain';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  return session?.user?.email ? <LoginedMain /> : <NotLogined />;
}
