'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AuthLayout from '@/app/authLayout';
import { theme } from '@/mui/theme';
import { ThemeProvider } from '@mui/system';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Navbar />
          <AuthLayout>{children}</AuthLayout>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
