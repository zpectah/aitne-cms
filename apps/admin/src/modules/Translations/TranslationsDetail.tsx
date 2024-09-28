import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, LanguageTabs, Select } from '../../components';
import { articlesBlankModel, TranslationsBlankModel } from '../../constants';
import { useConfirmSore, useTranslationsDetailQuery } from '../../hooks';
import { useTranslationsDetail } from './hooks';

const TranslationsDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();
  const { t } = useTranslation(['common']);
  const isNew = useMemo(() => id === 'new', [id]);

  const {
    options,
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
    languages,
  } = useTranslationsDetail();

  const {
    query: { data },
  } = useTranslationsDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (isNew) {
      return 'New category';
    }

    if (data) {
      return data.name;
    }
  }, [isNew, data]);

  useEffect(() => {
    if (isNew) {
      reset(TranslationsBlankModel);
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
          <Button component={Link} to={config.routes.translations.path} variant="outlined">
            {t('btn.cancel')}
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.translations.path}
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
            render={({ field }) => <TextField placeholder="Translation name" {...field} />}
          />
        </FormField>
        <FormField label="Type">
          <Controller
            control={control}
            defaultValue={articlesBlankModel.type}
            name="type"
            render={({ field }) => <Select items={options.type} placeholder="Select type" {...field} />}
          />
        </FormField>
        <Divider />
        <LanguageTabs
          languages={languages}
          renderContent={(lng) => (
            <FormField key={`${lng}_value`} label={`Value (${lng})`}>
              <Controller
                control={control}
                defaultValue=""
                name={`lang.${lng}.value`}
                render={({ field }) => <TextField placeholder="Translation value" {...field} />}
              />
            </FormField>
          )}
        />
      </Stack>
    </DetailDrawerLayout>
  );
};

export default TranslationsDetail;
