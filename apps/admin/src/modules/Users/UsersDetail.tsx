import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import config from '../../../config';
import { DetailDrawerLayout, FormField, SwitchControlled, Select } from '../../components';
import { usersBlankModel } from '../../constants';
import { useConfirmSore, useUsersDetailQuery } from '../../hooks';
import { useUsersDetail } from './hooks';

const UsersDetail = () => {
  const { id } = useParams();
  const { onConfirm } = useConfirmSore();

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
    if (id === 'new') {
      return 'New user';
    }

    if (data) {
      return data.email;
    }
  }, [id, data]);

  useEffect(() => {
    if (id === 'new') {
      reset(usersBlankModel);
    } else if (data) {
      const updatedObject = Object.assign(data);

      delete updatedObject.password;
      delete updatedObject.salt;

      reset(updatedObject);
    }
  }, [reset, data, id]);

  return (
    <DetailDrawerLayout
      footer={
        <>
          <Stack direction="row" gap={2}>
            <Button type="submit">Submit</Button>
          </Stack>
          <Button component={Link} to={config.routes.users.path} variant="outlined">
            Close
          </Button>
        </>
      }
      formProps={{
        onSubmit: handleSubmit(onSubmit),
      }}
      isLoading={isLoading}
      rootPath={config.routes.users.path}
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
        <FormField label="Email">
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field }) => <TextField placeholder="Email" type="email" {...field} />}
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
            render={({ field }) => <TextField placeholder="Password" {...field} />}
          />
        </FormField>
        <Divider />
        <FormField label="Type">
          <Controller
            control={control}
            defaultValue="default"
            name="type"
            render={({ field }) => <Select items={options.type} placeholder="Select type" {...field} />}
          />
        </FormField>
        <FormField label="Role">
          <Controller
            control={control}
            defaultValue="demo"
            name="role"
            render={({ field }) => <Select items={options.role} placeholder="Select role" {...field} />}
          />
        </FormField>
      </Stack>
    </DetailDrawerLayout>
  );
};

export default UsersDetail;
