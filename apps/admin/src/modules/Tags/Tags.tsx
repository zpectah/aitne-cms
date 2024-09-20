import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';

const Tags = () => {
  console.log('page view: Users');

  return (
    <ViewLayout
      meta={{ title: 'Tags' }}
      title="Tags"
      titleSlot={<NewButtonLink to={`${config.routes.tags.path}/new`}>New tag</NewButtonLink>}
    >
      <TagsList />
      <DetailDrawerWrapper rootPath={config.routes.tags.path}>
        <TagsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Tags;
