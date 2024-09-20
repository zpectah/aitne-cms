import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { ViewLayout, DetailDrawerWrapper } from '../../components';
import TagsList from './TagsList';
import TagsDetail from './TagsDetail';

const Tags = () => {
  console.log('page view: Users');

  return (
    <ViewLayout
      meta={{ title: 'Tags' }}
      title="Tags"
      titleSlot={
        <Button component={Link} to="/tags/new">
          New tag
        </Button>
      }
    >
      <TagsList />
      <DetailDrawerWrapper rootPath="/tags">
        <TagsDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Tags;
