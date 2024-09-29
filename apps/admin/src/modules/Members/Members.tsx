import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';

const Members = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('members.title') }}
      title={t('members.title')}
      titleSlot={<NewButtonLink to={`${config.routes.members.path}/new`}>{t('members.new')}</NewButtonLink>}
    >
      ...
      <DetailDrawerWrapper rootPath={config.routes.members.path}>...</DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Members;
