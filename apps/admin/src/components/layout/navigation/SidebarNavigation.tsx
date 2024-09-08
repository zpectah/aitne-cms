import { Link } from 'react-router-dom';

import config from '../../../../config';

const SidebarNavigation = () => {
  const { routes } = config;

  return (
    <nav>
      <ul>
        <li>
          <Link to={routes.dashboard.path}>Home</Link>
        </li>
        <li>
          <Link to={routes.articles.path}>Articles</Link>
        </li>

        <li>
          <Link to={routes.login.path}>Login</Link>
        </li>
        <li>
          <Link to={routes.passwordRecovery.path}>Password recovery</Link>
        </li>
      </ul>
      ...sidebar navigation...
    </nav>
  );
};

export default SidebarNavigation;
