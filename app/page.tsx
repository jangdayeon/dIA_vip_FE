'use client';

import { getSession } from '@/actions/myauth';
import LoginedMain from '@/components/LoginedMain';
import NotLoginedMain from '@/components/NotLoginedMain';
import { useEffect, useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');

  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
    })();
  }, []);

  return <>{id ? <LoginedMain /> : <NotLoginedMain />}</>;
}
