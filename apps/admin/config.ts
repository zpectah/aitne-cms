// eslint-disable-next-line @nx/enforce-module-boundaries
import aitne from '../../aitne.config';

export default {
  cms: aitne,
  locales: {
    default: 'en',
    fallback: 'en',
    supported: ['en', 'cs'],
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
      label: 'page.login',
    },
    passwordRecovery: {
      path: '/password-recovery',
      label: 'page.password-recovery',
    },
    dashboard: {
      path: '/dashboard',
      label: 'page.dashboard',
    },
    articles: {
      path: '/articles',
      label: 'page.articles',
    },
    settings: {
      path: '/settings',
      label: 'page.settings',
    },
    users: {
      path: '/users',
      label: 'page.users',
    },
  },
};
