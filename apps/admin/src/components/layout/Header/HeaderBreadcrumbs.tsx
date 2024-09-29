import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import config from '../../../../config';
import { useBreakpoint, useSettings } from '../../../hooks';

type Route = {
  path: string;
  key: string;
};

const findRoute = (pathname: string): Route => {
  let route = { path: '/' } as Route;
  const keys = Object.keys(config.routes);

  keys.forEach((key) => {
    if (pathname.includes(key)) {
      route = {
        ...config.routes[key as keyof typeof config.routes],
        key,
      };
    }
  });

  return route;
};

const HeaderBreadcrumbs = () => {
  const { isDesktop } = useBreakpoint();
  const location = useLocation();
  const route = findRoute(location.pathname);
  const { t } = useTranslation('modules');
  const { panel, id } = useParams();
  const { settings } = useSettings();

  if (isDesktop)
    return (
      <Breadcrumbs>
        <Typography>{settings['app.meta_title'] ?? config.cms.meta.name}</Typography>
        <Typography>{t(`${route.key}.label`)}</Typography>
        {id && <Typography>#{id}</Typography>}
        {panel && <Typography>{panel}</Typography>}
      </Breadcrumbs>
    );
};

export default HeaderBreadcrumbs;
