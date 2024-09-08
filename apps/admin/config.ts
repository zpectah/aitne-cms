// eslint-disable-next-line @nx/enforce-module-boundaries
import cms from '../../build';

export default {
  cms,
  locales: {
    default: 'en',
    fallback: 'en',
    supported: ['en', 'cs'],
  },
  routes: {
    root: '/',
    error: {
      path: '*',
    },
    login: {
      path: '/login',
    },
    passwordRecovery: {
      path: '/password-recovery',
    },
    dashboard: {
      path: '/dashboard',
    },
    articles: {
      path: '/articles',
    },
  },
};
