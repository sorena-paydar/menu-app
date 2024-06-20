import { useForm } from 'react-hook-form';
import { SignupFormInputs } from '@/app/register/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/app/register/constants';
import { Button, TextField } from '@mui/material';
import useAPI from '@/hooks/useAPI';
import { POST_SIGN_UP_EP } from '@/app/register/API/endpoint';
import Cookies from 'js-cookie';
import { useSnackbar } from '@/hooks/useSnackbar';
import { LoadingButton } from '@mui/lab';
import { RegisterTabs } from '@/app/register/page';

interface Props {
  switchTab: (value: keyof RegisterTabs) => void;
}

export const Signup = ({ switchTab }: Props) => {
  const { generateSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const { request: signupRequest, pending } = useAPI({
    method: 'post',
    route: POST_SIGN_UP_EP,
    successCallback: (data: { data: { token: string } }) => {
      Cookies.set('auth-token', data.data.token);
      generateSnackbar({
        message: 'Signed In Successfully.',
        variant: 'success',
      });
      window.location.href = '/';
    },
    failedCallback: (error: { message: string }) => {
      console.log(error.message);
      generateSnackbar({
        message: error.message,
        variant: 'info',
      });
      switchTab('login');
    },
  });

  const onSubmit = (data: SignupFormInputs) => {
    signupRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-2">
          <TextField
            required
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            required
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </div>

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
        />

        <TextField
          required
          label="Phone Number"
          {...register('phoneNumber')}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <TextField
          required
          label="Brand Name"
          {...register('brandName')}
          error={!!errors.brandName}
          helperText={errors.brandName?.message}
        />

        <LoadingButton type="submit" variant="contained" loading={pending}>
          Sign up
        </LoadingButton>
      </div>
    </form>
  );
};
