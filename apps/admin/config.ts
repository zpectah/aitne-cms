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
      routes: {
        global: {
          label: 'page.settings.panel.global',
        },
        system: {
          path: '/settings/system',
          label: 'page.settings.panel.system',
        },
        locales: {
          path: '/settings/locales',
          label: 'page.settings.panel.locales',
        },
        maintenance: {
          path: '/settings/maintenance',
          label: 'page.settings.panel.maintenance',
        },
      },
    },
    users: {
      path: '/users',
      label: 'page.users',
    },
    tags: {
      path: '/tags',
      label: 'page.tags',
    },
    categories: {
      path: '/categories',
      label: 'page.categories',
    },
    translations: {
      path: '/translations',
      label: 'page.translations',
    },
  },
};
