import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, Select } from '../../components';
import { tagsBlankModel } from '../../constants';
import { useConfirmSore, useTagsDetailQuery } from '../../hooks';
import { useTagsDetail } from './hooks';

const TagsDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();

  const {
    options,
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
  } = useTagsDetail();

  const {
    query: { data },
  } = useTagsDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (id === 'new') {
      return 'New tag';
    }

    if (data) {
      return data.name;
    }
  }, [id, data]);

  useEffect(() => {
    if (id === 'new') {
      reset(tagsBlankModel);
    } else if (data) reset(data);
  }, [reset, data, id]);

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
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.tags.path}
      sidebar={
        <Stack>
          <Controller
            control={control}
            name="active"
            render={({ field }) => (
              <SwitchControlled
                checked={field.value === 1}
                label="Active"
                onChange={(_, checked) => field.onChange(checked ? 1 : 0)}
                ref={field.ref}
              />
            )}
          />
          <Controller
            control={control}
            name="deleted"
            render={({ field }) => (
              <SwitchControlled
                checked={field.value === 1}
                label="Deleted"
                onChange={(_, checked) => {
                  if (checked) {
                    onConfirm(() => field.onChange(checked ? 1 : 0), 'This item will be deleted');
                  } else {
                    field.onChange(checked ? 1 : 0);
                  }
                }}
                ref={field.ref}
                switchProps={{ color: 'error' }}
              />
            )}
          />
        </Stack>
      }
      title={detailTitle}
    >
      <Stack component="section" gap={2}>
        <FormField label="Name">
          <Controller
            control={control}
            defaultValue=""
            name="name"
            render={({ field }) => <TextField placeholder="Tag name" {...field} />}
          />
        </FormField>
        <FormField label="Color">
          <Controller
            control={control}
            defaultValue="none"
            name="color"
            render={({ field }) => <Select items={options.color} placeholder="Select tag color" {...field} />}
          />
        </FormField>
      </Stack>
    </DetailDrawerLayout>
  );
};

export default TagsDetail;
