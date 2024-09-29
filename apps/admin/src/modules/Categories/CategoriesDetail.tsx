import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, CategoriesDataPicker, LanguageTabs } from '../../components';
import { categoriesBlankModel } from '../../constants';
import { useConfirmSore, useCategoriesDetailQuery } from '../../hooks';
import { useCategoriesDetail } from './hooks';

const CategoriesDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();
  const { t } = useTranslation(['common', 'modules']);
  const isNew = useMemo(() => id === 'new', [id]);

  const {
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
    languages,
  } = useCategoriesDetail();

  const {
    query: { data },
  } = useCategoriesDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (isNew) {
      return t('modules:categories.new');
    }

    if (data) {
      return data.name;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, data]);

  useEffect(() => {
    if (isNew) {
      reset(categoriesBlankModel);
    } else if (data) reset(data);
  }, [reset, data, isNew]);

  return (
    <DetailDrawerLayout
      footer={
        <>
          <Stack direction="row" gap={2}>
            <Button color={isNew ? 'success' : 'primary'} type="submit">
              {t(`btn.${isNew ? 'create' : 'update'}`)}
            </Button>
          </Stack>
          <Button component={Link} to={config.routes.categories.path} variant="outlined">
            {t('btn.cancel')}
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.categories.path}
      sidebar={
        <Stack gap={2}>
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
            render={({ field }) => <TextField placeholder="Category name" {...field} />}
          />
        </FormField>
        <FormField label="Parent category">
          <Controller
            control={control}
            defaultValue=""
            name="parent_id"
            render={({ field }) => <CategoriesDataPicker withParent ignoredId={[data?.id]} {...field} />}
          />
        </FormField>
        <Divider />
        <LanguageTabs
          languages={languages}
          renderContent={(lng) => (
            <FormField key={`${lng}_title`} label={`Title (${lng})`}>
              <Controller
                control={control}
                defaultValue=""
                name={`lang.${lng}.title`}
                render={({ field }) => <TextField placeholder="Article title" {...field} />}
              />
            </FormField>
          )}
        />
      </Stack>
    </DetailDrawerLayout>
  );
};

export default CategoriesDetail;
