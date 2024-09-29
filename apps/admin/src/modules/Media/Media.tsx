import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';

const Media = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('media.title') }}
      title={t('media.title')}
      titleSlot={<NewButtonLink to={`${config.routes.media.path}/new`}>{t('media.new')}</NewButtonLink>}
    >
      ...
      <DetailDrawerWrapper rootPath={config.routes.media.path}>...</DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Media;
