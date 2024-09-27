import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import config from '../../../config';
import {
  DetailDrawerLayout,
  FormField,
  SwitchControlled,
  CategoriesDataPicker,
  TagsDataPicker,
  LanguageTabs,
  Select,
} from '../../components';
import { articlesBlankModel, locales } from '../../constants';
import { useConfirmSore, useArticlesDetailQuery } from '../../hooks';
import { useArticlesDetail } from './hooks';

const ArticlesDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();
  const { t, i18n } = useTranslation(['common']);
  const isNew = useMemo(() => id === 'new', [id]);

  const {
    options,
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
    languages,
  } = useArticlesDetail();

  const {
    query: { data },
  } = useArticlesDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (isNew) {
      return 'New article';
    }

    if (data) {
      return data.name;
    }
  }, [isNew, data]);

  useEffect(() => {
    if (isNew) {
      reset(articlesBlankModel);
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
          <Button component={Link} to={config.routes.articles.path} variant="outlined">
            {t('btn.cancel')}
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.articles.path}
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
          <div>
            <Controller
              control={control}
              defaultValue={dayjs()}
              name="publish_start"
              render={({ field: { value, onChange, ref } }) => (
                <DateTimePicker
                  defaultValue={null}
                  format={locales[i18n.language].format.datetime}
                  onChange={onChange}
                  ref={ref}
                  slotProps={{
                    textField: {
                      placeholder: 'Published from',
                    },
                  }}
                  value={value ? dayjs(value) : null}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              defaultValue={dayjs()}
              name="publish_end"
              render={({ field: { value, onChange, ref } }) => (
                <DateTimePicker
                  defaultValue={null}
                  format={locales[i18n.language].format.datetime}
                  onChange={onChange}
                  ref={ref}
                  slotProps={{
                    textField: {
                      placeholder: 'Published to',
                    },
                  }}
                  value={value ? dayjs(value) : null}
                />
              )}
            />
          </div>
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
        <Divider />
        <FormField label="Type">
          <Controller
            control={control}
            defaultValue={articlesBlankModel.type}
            name="type"
            render={({ field }) => <Select items={options.type} placeholder="Select type" {...field} />}
          />
        </FormField>
        <FormField label="Categories">
          <Controller
            control={control}
            defaultValue={articlesBlankModel.categories}
            name="categories"
            render={({ field }) => <CategoriesDataPicker multiple placeholder="Select categories" {...field} />}
          />
        </FormField>
        <FormField label="Tags">
          <Controller
            control={control}
            defaultValue={articlesBlankModel.tags}
            name="tags"
            render={({ field }) => <TagsDataPicker multiple placeholder="Select tags" {...field} />}
          />
        </FormField>
        <Divider />
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
                  render={({ field }) => <TextField multiline placeholder="Article description" rows={5} {...field} />}
                />
              </FormField>
              <FormField key={`${lng}_content`} label={`Content (${lng})`}>
                <Controller
                  control={control}
                  defaultValue=""
                  name={`lang.${lng}.content`}
                  render={({ field }) => <TextField multiline placeholder="Article content" rows={10} {...field} />}
                />
              </FormField>
            </>
          )}
        />
      </Stack>
    </DetailDrawerLayout>
  );
};

export default ArticlesDetail;
