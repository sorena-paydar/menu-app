'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Navbar } from '@/components/navbar';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Navbar />
      {children}
    </SnackbarProvider>
  );
}
