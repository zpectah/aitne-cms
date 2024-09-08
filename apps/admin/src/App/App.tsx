import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppProvider from './AppProvider';
import AppRouter from './AppRouter';
import AppPreloader from './AppPreloader';

import '../i18n';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

const queryClient = new QueryClient();

const App = () => (
  <Suspense fallback={<AppPreloader />}>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </QueryClientProvider>
  </Suspense>
);

export default App;
