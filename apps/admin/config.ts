// eslint-disable-next-line @nx/enforce-module-boundaries
import aitne from '../../aitne.config';

export default {
  cms: aitne,
  locales: {
    default: 'en',
    fallback: 'en',
    supported: ['en', 'cs'],
  },
  theme: {
    mode: 'light',
  },
  routes: {
    root: {
      path: '/',
    },
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
    settings: {
      path: '/settings',
      routes: {
        global: {},
        system: {
          path: '/settings/system',
        },
        locales: {
          path: '/settings/locales',
        },
        maintenance: {
          path: '/settings/maintenance',
        },
      },
    },
    users: {
      path: '/users',
    },
    tags: {
      path: '/tags',
    },
    categories: {
      path: '/categories',
    },
    translations: {
      path: '/translations',
    },
  },
};
