import { ViewLayout, DetailDrawerWrapper } from '../../components';
import UsersList from './Users.list';
import UsersDetail from './Users.detail';

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
