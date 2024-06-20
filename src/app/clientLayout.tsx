'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
