import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import config from '../../config';
import { PageLayout, PageLayoutPreloader } from '../components';
import { Error } from '../modules';

const Login = lazy(() => import('../modules/Login/Login'));
const PasswordRecovery = lazy(() => import('../modules/PasswordRecovery/PasswordRecovery'));
const Dashboard = lazy(() => import('../modules/Dashboard/Dashboard'));
const Articles = lazy(() => import('../modules/Articles/Articles'));
const Users = lazy(() => import('../modules/Users/Users'));
const Settings = lazy(() => import('../modules/Settings/Settings'));
const Tags = lazy(() => import('../modules/Tags/Tags'));
const Categories = lazy(() => import('../modules/Categories/Categories'));
const Translations = lazy(() => import('../modules/Translations/Translations'));
const Media = lazy(() => import('../modules/Media/Media'));
const Members = lazy(() => import('../modules/Members/Members'));
const Pages = lazy(() => import('../modules/Pages/Pages'));

const AppRouter = () => {
  const { routes } = config;

  const router = createBrowserRouter(
    [
      {
        path: routes.error.path,
        element: <PageLayout isMinimal />,
        children: [
          {
            path: routes.error.path,
            element: <Error />,
          },
        ],
      },
      {
        path: routes.login.path,
        element: <PageLayout isMinimal />,
        children: [
          {
            path: routes.login.path,
            element: <Login />,
          },
        ],
      },
      {
        path: routes.passwordRecovery.path,
        element: <PageLayout isMinimal />,
        children: [
          {
            path: routes.passwordRecovery.path,
            element: <PasswordRecovery />,
          },
        ],
      },
      {
        path: routes.root.path,
        element: <PageLayout />,
        children: [
          {
            path: routes.root.path,
            element: <Navigate replace to={routes.login.path} />,
          },
          {
            path: routes.dashboard.path,
            element: <Dashboard />,
          },
          {
            path: routes.settings.path,
            element: <Settings />,
            children: [
              {
                path: `${routes.settings.path}/:panel`,
                element: <Settings />,
              },
            ],
          },
          {
            path: routes.articles.path,
            element: <Articles />,
            children: [
              {
                path: `${routes.articles.path}/:id`,
                element: <Articles />,
              },
            ],
          },
          {
            path: routes.users.path,
            element: <Users />,
            children: [
              {
                path: `${routes.users.path}/:id`,
                element: <Users />,
              },
            ],
          },
          {
            path: routes.tags.path,
            element: <Tags />,
            children: [
              {
                path: `${routes.tags.path}/:id`,
                element: <Tags />,
              },
            ],
          },
          {
            path: routes.categories.path,
            element: <Categories />,
            children: [
              {
                path: `${routes.categories.path}/:id`,
                element: <Categories />,
              },
            ],
          },
          {
            path: routes.translations.path,
            element: <Translations />,
            children: [
              {
                path: `${routes.translations.path}/:id`,
                element: <Translations />,
              },
            ],
          },
          {
            path: routes.media.path,
            element: <Media />,
            children: [
              {
                path: `${routes.media.path}/:id`,
                element: <Media />,
              },
            ],
          },
          {
            path: routes.members.path,
            element: <Members />,
            children: [
              {
                path: `${routes.members.path}/:id`,
                element: <Members />,
              },
            ],
          },
          {
            path: routes.pages.path,
            element: <Pages />,
            children: [
              {
                path: `${routes.pages.path}/:id`,
                element: <Pages />,
              },
            ],
          },
        ],
      },
    ],
    { basename: routes.root.path }
  );

  return <RouterProvider fallbackElement={<PageLayoutPreloader />} router={router} />;
};

export default AppRouter;
