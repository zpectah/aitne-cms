import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, Select } from '../../components';
import { useTagsDetail } from './hooks';

const TagsDetail = () => {
  const { options, onSubmit } = useTagsDetail();

  return (
    <DetailDrawerLayout
      footer={
        <>
          <Stack direction="row" gap={2}>
            <Button type="submit">Submit</Button>
          </Stack>
          <Button component={Link} to={config.routes.tags.path} variant="outlined">
            Close
          </Button>
        </>
      }
      formProps={{
        onSubmit,
      }}
      rootPath={config.routes.tags.path}
      sidebar={
        <Stack>
          <SwitchControlled defaultChecked label="Active" />
          <SwitchControlled label="Delete" />
        </Stack>
      }
      title="Detail title ... by selected ID"
    >
      <Stack component="section" gap={2}>
        <FormField label="Name">
          <TextField name="tags.name" placeholder="Tag name" />
        </FormField>
        <FormField label="Color">
          <Select defaultValue="none" items={options.color} name="tags.color" placeholder="Select tag color" />
        </FormField>
      </Stack>
    </DetailDrawerLayout>
  );
};

export default TagsDetail;
