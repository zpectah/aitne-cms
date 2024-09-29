import { useTranslation } from 'react-i18next';

import { ViewLayout, MiniFooter } from '../../components';
import LoginForm from './LoginForm';

const Login = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      isCentered
      layoutContainerProps={{ containerProps: { maxWidth: 'sm' } }}
      layoutStackProps={{ sx: { textAlign: 'center' } }}
      meta={{ title: t('login.title') }}
      title={t('login.title')}
    >
      <LoginForm />
      <MiniFooter />
    </ViewLayout>
  );
};

export default Login;
