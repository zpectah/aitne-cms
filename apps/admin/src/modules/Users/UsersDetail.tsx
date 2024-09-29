import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, Select, EmailInput, PasswordInput } from '../../components';
import { usersBlankModel } from '../../constants';
import { useConfirmSore, useUsersDetailQuery } from '../../hooks';
import { useUsersDetail } from './hooks';

const UsersDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();
  const { t } = useTranslation(['common', 'modules']);
  const isNew = useMemo(() => id === 'new', [id]);

  const {
    options,
    onSubmit,
    isLoading,
    form: { handleSubmit, reset, control },
  } = useUsersDetail();

  const {
    query: { data },
  } = useUsersDetailQuery(id ? parseInt(id, 10) : undefined);

  const detailTitle = useMemo(() => {
    if (isNew) {
      return t('modules:users.new');
    }

    if (data) {
      return data.email;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, data]);

  useEffect(() => {
    if (isNew) {
      reset(usersBlankModel);
    } else if (data) {
      const updatedObject = Object.assign(data);

      delete updatedObject.password;
      delete updatedObject.salt;

      reset(updatedObject);
    }
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
          <Button component={Link} to={config.routes.users.path} variant="outlined">
            {t('btn.cancel')}
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.users.path}
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
        <FormField label="Email">
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field }) => <EmailInput disableIcon placeholder="Email" {...field} />}
          />
        </FormField>
        <FormField label="Firstname">
          <Controller
            control={control}
            defaultValue=""
            name="firstname"
            render={({ field }) => <TextField placeholder="Firstname" {...field} />}
          />
        </FormField>
        <FormField label="Lastname">
          <Controller
            control={control}
            defaultValue=""
            name="lastname"
            render={({ field }) => <TextField placeholder="Lastname" {...field} />}
          />
        </FormField>
        <Divider />
        <FormField label="Password">
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({ field }) => <PasswordInput disableIcon placeholder="Password" {...field} />}
          />
        </FormField>
        <Divider />
        <FormField label="Type">
          <Controller
            control={control}
            defaultValue={usersBlankModel.type}
            name="type"
            render={({ field }) => <Select items={options.type} placeholder="Select type" {...field} />}
          />
        </FormField>
        <FormField label="Role">
          <Controller
            control={control}
            defaultValue={usersBlankModel.role}
            name="role"
            render={({ field }) => <Select items={options.role} placeholder="Select role" {...field} />}
          />
        </FormField>
      </Stack>
    </DetailDrawerLayout>
  );
};

export default UsersDetail;
