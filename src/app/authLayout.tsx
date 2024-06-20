'use client';

import { useProfile } from '@/hooks/useProfile';
import { Button } from '@mui/material';
import { Loading } from '@/components/loading';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pending, error } = useProfile();

  if (pending) {
    return <Loading />;
  }

  if (error) {
    return <Button onClick={() => window.location.reload()}>Retry</Button>;
  }

  return children;
}
