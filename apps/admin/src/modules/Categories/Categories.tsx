import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import CategoriesList from './CategoriesList';
import CategoriesDetail from './CategoriesDetail';

const Categories = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('categories.title') }}
      title={t('categories.title')}
      titleSlot={<NewButtonLink to={`${config.routes.categories.path}/new`}>{t('categories.new')}</NewButtonLink>}
    >
      <CategoriesList />
      <DetailDrawerWrapper rootPath={config.routes.categories.path}>
        <CategoriesDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Categories;
