import { ViewLayout, DetailDrawerWrapper } from '../../components';
import TagsList from './Tags.list';
import TagsDetail from './Tags.detail';

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
