import { ViewLayout, DetailDrawerWrapper } from '../../components';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';

const Tags = () => {
  console.log('page view: Users');

  return (
    <ViewLayout meta={{ title: 'Tags' }} title="Tags">
      <TagsList />
      <DetailDrawerWrapper rootPath="/tags">
        <TagsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Tags;
