import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';

const Pages = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('pages.title') }}
      title={t('pages.title')}
      titleSlot={<NewButtonLink to={`${config.routes.pages.path}/new`}>{t('pages.new')}</NewButtonLink>}
    >
      ...
      <DetailDrawerWrapper rootPath={config.routes.pages.path}>...</DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Pages;
