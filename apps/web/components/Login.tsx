import * as Yup from 'yup';
import { Stack, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import login from '../utils/login';
import { FormProvider, RHFTextField } from './hook-form';
import { useSetToken } from '../store/tokenStore';

type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const setToken = useSetToken();
  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const { token } = await login({
        email: data.email,
        password: data.password,
      });
      setToken(token);
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="password" label="Password" type="password" />
        <Button fullWidth size="large" type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}
