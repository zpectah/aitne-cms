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
        path: routes.root,
        element: <PageLayout />,
        children: [
          {
            path: routes.root,
            element: <Navigate replace to="/dashboard" />,
          },
          {
            path: routes.dashboard.path,
            element: <Dashboard />,
          },
          {
            path: routes.articles.path,
            element: <Articles />,
          },
          {
            path: routes.users.path,
            element: <Users />,
          },
          {
            path: routes.settings.path,
            element: <Settings />,
          },
        ],
      },
    ],
    { basename: routes.root }
  );

  return <RouterProvider fallbackElement={<PageLayoutPreloader />} router={router} />;
};

export default AppRouter;
