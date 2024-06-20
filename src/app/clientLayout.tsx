'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AuthLayout from '@/app/authLayout';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Navbar />
        <AuthLayout>{children}</AuthLayout>
      </SnackbarProvider>
    </Provider>
  );
}
