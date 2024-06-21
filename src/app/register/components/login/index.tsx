import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '@/app/register/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/app/register/constants';
import useAPI from '@/hooks/useAPI';
import { POST_LOG_IN_EP } from '@/app/register/API/endpoint';
import Cookies from 'js-cookie';
import { delay } from 'lodash';
import { RegisterTabs } from '@/app/register/page';
import { COOKIES } from '@/constants/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface Props {
  switchTab: (value: keyof RegisterTabs) => void;
}

export const Login = ({ switchTab }: Props) => {
  const router = useRouter();

  const { generateSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const { request: loginRequest, pending } = useAPI({
    method: 'post',
    route: POST_LOG_IN_EP,
    successCallback: (data: { data: { token: string } }) => {
      Cookies.set(COOKIES['authToken'], data.data.token);
      generateSnackbar({
        message: 'Logged In Successfully.',
        variant: 'success',
      });

      delay(() => router.push(ROUTES['home']), 1000);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });

      switchTab('signup');
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3">
        <TextField
          required
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          required
          label="Password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
        />

        <LoadingButton type="submit" variant="contained" loading={pending}>
          Login
        </LoadingButton>
      </div>
    </form>
  );
};
