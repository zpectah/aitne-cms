import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppProvider from './AppProvider';
import AppRouter from './AppRouter';
import AppPreloader from './AppPreloader';
import { ConfirmDialog, Toasts } from '../components';
import { useLocales, useTheme } from '../hooks';

import '../i18n';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

const queryClient = new QueryClient();

const App = () => {
  const { init: initLocales } = useLocales();
  const { init: initTheme } = useTheme();

  useEffect(() => {
    initLocales();
    initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<AppPreloader />}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppRouter />
          <ConfirmDialog />
          <Toasts />
        </AppProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
