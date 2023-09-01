'use client';

import { useRouter } from 'next/navigation';

const StartPage = () => {
  const router = useRouter();
  router.push('/login');

  return;
};

export default StartPage;
