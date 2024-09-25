import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

const Users = () => {
  console.log('page view: Users');

  return (
    <ViewLayout
      meta={{ title: 'Users' }}
      title="Users"
      titleSlot={<NewButtonLink to={`${config.routes.users.path}/new`}>New user</NewButtonLink>}
    >
      <UsersList />
      <DetailDrawerWrapper rootPath={config.routes.users.path}>
        <UsersDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Users;
