'use client';

import { SnackbarProvider } from '@/hooks/useSnackbar';
import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { store } from '@/store';
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
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
