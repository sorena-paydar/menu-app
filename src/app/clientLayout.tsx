'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Navbar } from '@/components/navbar';
import { useProfile } from '@/hooks/useProfile';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {} = useProfile();

  return (
    <SnackbarProvider maxSnack={3}>
      <Navbar />
      {children}
    </SnackbarProvider>
  );
}
