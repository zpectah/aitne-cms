import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import config from '../../../config';
import { FormField } from '../../components';
import { LoginFormModel } from '../../types';

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormModel>({
    defaultValues: {
      email: '',
      password: '',
      lang: 'en', // TODO #getDefault
    },
  });

  const submitHandler: SubmitHandler<LoginFormModel> = (model) => {
    // TODO
    console.log('form model', model);
    //

    // TODO
    navigate(config.routes.dashboard.path);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack direction="column" gap={3}>
            <Stack direction="column" gap={2}>
              <FormField required fieldError={errors.email}>
                <TextField placeholder="Email" {...register('email', { required: true, minLength: 3 })} />
              </FormField>
              <FormField required fieldError={errors.password}>
                <TextField
                  placeholder="Password"
                  type="password"
                  {...register('password', { required: true, minLength: 3 })}
                />
              </FormField>
            </Stack>
            <Stack direction="column" gap={1}>
              <Button size="large" type="submit">
                Login
              </Button>
              <Button component={Link} to={config.routes.passwordRecovery.path} variant="text">
                Lost password
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
