'use client';

import { useSelector } from 'react-redux';
import { selectProfile } from '@/store/slices/profile';

export default function Home() {
  const { profile } = useSelector(selectProfile);

  return (
    <main className="flex min-h-screen">
      <p className="mt-8 color-red">Welcome {profile?.firstName}</p>
    </main>
  );
}
