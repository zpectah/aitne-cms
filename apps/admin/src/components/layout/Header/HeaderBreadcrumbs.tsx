import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import config from '../../../../config';
import { useBreakpoint } from '../../../hooks';

type Route = {
  path: string;
  label?: string;
};

interface HeaderBreadcrumbsProps {
  disableLanguage?: boolean;
}

const findRoute = (pathname: string): Route => {
  let route = { path: '/' } as Route;
  const keys = Object.keys(config.routes);

  keys.forEach((key) => {
    if (pathname.includes(key)) {
      route = config.routes[key as keyof typeof config.routes];
    }
  });

  return route;
};

const HeaderBreadcrumbs = ({ disableLanguage }: HeaderBreadcrumbsProps) => {
  const { isDesktop } = useBreakpoint();
  const location = useLocation();
  const route = findRoute(location.pathname);
  const { t, i18n } = useTranslation();
  const { panel } = useParams();

  if (isDesktop)
    return (
      <Breadcrumbs>
        <Typography>{config.cms.meta.name}</Typography>
        {!disableLanguage && <Typography>{i18n.language}</Typography>}
        <Typography>{t(`${route?.label}`)}</Typography>
        {panel && <Typography>{panel}</Typography>}
      </Breadcrumbs>
    );
};

export default HeaderBreadcrumbs;
