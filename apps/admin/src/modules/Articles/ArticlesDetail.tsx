import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import config from '../../../config';
import {
  DetailDrawerLayout,
  FormField,
  SwitchControlled,
  CategoriesDataPicker,
  TagsDataPicker,
  LanguageTabs,
} from '../../components';
import { articlesBlankModel } from '../../constants';
import { useConfirmSore, useArticlesDetailQuery } from '../../hooks';
import { useArticlesDetail } from './hooks';

const ArticlesDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();

  const {
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
    languages,
  } = useArticlesDetail();

  const {
    query: { data },
  } = useArticlesDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (id === 'new') {
      return 'New article';
    }

    if (data) {
      return data.name;
    }
  }, [id, data]);

  useEffect(() => {
    if (id === 'new') {
      reset(articlesBlankModel);
      // TODO #languages
    } else if (data) reset(data);
  }, [reset, data, id]);

  return (
    <DetailDrawerLayout
      footer={
        <>
          <Stack direction="row" gap={2}>
            <Button type="submit">Submit</Button>
          </Stack>
          <Button component={Link} to={config.routes.articles.path} variant="outlined">
            Close
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.articles.path}
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
            render={({ field }) => <TextField placeholder="Article name" {...field} />}
          />
        </FormField>
        <LanguageTabs
          languages={languages}
          renderContent={(lng) => (
            <>
              <FormField key={`${lng}_title`} label={`Title (${lng})`}>
                <Controller
                  control={control}
                  defaultValue=""
                  name={`lang.${lng}.title`}
                  render={({ field }) => <TextField placeholder="Article title" {...field} />}
                />
              </FormField>
              <FormField key={`${lng}_description`} label={`Description (${lng})`}>
                <Controller
                  control={control}
                  defaultValue=""
                  name={`lang.${lng}.description`}
                  render={({ field }) => <TextField placeholder="Article description" {...field} />}
                />
              </FormField>
            </>
          )}
        />
        <FormField label="Categories">
          <Controller
            control={control}
            defaultValue={[]}
            name="categories"
            render={({ field }) => <CategoriesDataPicker multiple {...field} />}
          />
        </FormField>
        <FormField label="Tags">
          <Controller
            control={control}
            defaultValue={[]}
            name="tags"
            render={({ field }) => <TagsDataPicker multiple {...field} />}
          />
        </FormField>
      </Stack>
    </DetailDrawerLayout>
  );
};

export default ArticlesDetail;
