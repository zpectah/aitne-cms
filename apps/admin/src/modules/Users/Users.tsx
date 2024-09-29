import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

const Users = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('users.title') }}
      title={t('users.title')}
      titleSlot={<NewButtonLink to={`${config.routes.users.path}/new`}>{t('users.new')}</NewButtonLink>}
    >
      <UsersList />
      <DetailDrawerWrapper rootPath={config.routes.users.path}>
        <UsersDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Users;
