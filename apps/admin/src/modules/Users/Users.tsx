import { ViewLayout, DetailDrawerWrapper } from '../../components';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';

const Users = () => {
  console.log('page view: Users');

  return (
    <ViewLayout meta={{ title: 'Users' }} title="Users">
      <UsersList />
      <DetailDrawerWrapper rootPath="/users">
        <UsersDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Users;
