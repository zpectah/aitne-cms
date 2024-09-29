import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';

const Tags = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('tags.title') }}
      title={t('tags.title')}
      titleSlot={<NewButtonLink to={`${config.routes.tags.path}/new`}>{t('tags.new')}</NewButtonLink>}
    >
      <TagsList />
      <DetailDrawerWrapper rootPath={config.routes.tags.path}>
        <TagsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Tags;
