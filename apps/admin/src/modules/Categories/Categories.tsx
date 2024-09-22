import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import CategoriesList from './CategoriesList';
import CategoriesDetail from './CategoriesDetail';

const Categories = () => {
  console.log('page view: Categories');

  return (
    <ViewLayout
      meta={{ title: 'Categories' }}
      title="Categories"
      titleSlot={<NewButtonLink to={`${config.routes.categories.path}/new`}>New category</NewButtonLink>}
    >
      <CategoriesList />
      <DetailDrawerWrapper rootPath={config.routes.categories.path}>
        <CategoriesDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Categories;
