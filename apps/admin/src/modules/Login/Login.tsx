import { ViewLayout, MiniFooter } from '../../components';
import LoginForm from './Login.form';

const Login = () => {
  console.log('page view: Login');

  return (
    <ViewLayout
      isCentered
      layoutContainerProps={{ containerProps: { maxWidth: 'sm' } }}
      layoutStackProps={{ sx: { textAlign: 'center' } }}
      meta={{ title: 'Login' }}
      title="Login"
    >
      <LoginForm />
      <MiniFooter />
    </ViewLayout>
  );
};

export default Login;
