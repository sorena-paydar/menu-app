import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAPI from '@/hooks/useAPI';
import { ChangePasswordInputs } from '@/app/profile/types';
import { PATH_CHANGE_PASSWORD_EP } from '@/app/profile/API/endpoint';
import { changePasswordSchema } from '@/app/profile/constants';
import Typography from '@mui/material/Typography';

export const ChangePassword = () => {
  const { generateSnackbar } = useSnackbar();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(changePasswordSchema),
  });

  const { request: changePasswordRequest, pending } = useAPI({
    method: 'patch',
    route: PATH_CHANGE_PASSWORD_EP,
    successCallback: () => {
      generateSnackbar({
        message: 'Password changed successfully.',
        variant: 'success',
      });

      reset();
    },

    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const onSubmit = (data: ChangePasswordInputs) => {
    changePasswordRequest(data);
  };

  return (
    <div>
      <Typography variant="h5">Password</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 mt-3 gap-y-3">
          <TextField
            label="Current Password"
            {...register('currentPassword')}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
          />

          <TextField
            label="New Password"
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            type="password"
          />

          <TextField
            label="Confirm New Password"
            {...register('newPasswordConfirm')}
            error={!!errors.newPasswordConfirm}
            helperText={errors.newPasswordConfirm?.message}
            type="password"
          />
        </div>

        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          loading={pending}
        >
          Change Password
        </LoadingButton>
      </form>
    </div>
  );
};
