import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useForm } from 'react-hook-form';
import { ChangePersonalInformationInputs } from '@/app/profile/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePersonalInformationSchema } from '@/app/profile/constants';
import useAPI from '@/hooks/useAPI';
import { PUT_CHANGE_PROFILE_DETAILS_EP } from '@/app/profile/API/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, setProfile } from '@/store/slices/profile';
import { isEqual } from 'lodash';

export const ChangePersonalInformation = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);

  const { generateSnackbar } = useSnackbar();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePersonalInformationInputs>({
    resolver: yupResolver(changePersonalInformationSchema),
    defaultValues: profile || {},
  });

  const { request: changePersonalInformationRequest, pending } = useAPI({
    method: 'put',
    route: PUT_CHANGE_PROFILE_DETAILS_EP,
    successCallback: ({ data }) => {
      dispatch(setProfile(data));
      generateSnackbar({
        message: 'Profile Updated successfully.',
        variant: 'success',
      });
    },

    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const onSubmit = (data: ChangePersonalInformationInputs) => {
    if (!isEqual(getValues(), profile)) changePersonalInformationRequest(data);
  };

  return (
    <div>
      <Typography variant="h5">Personal Information</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 mt-3 gap-y-3">
          <div className="flex gap-x-3">
            <TextField
              label="First Name"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </div>

          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone Number"
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            label="Brand Name"
            {...register('brandName')}
            error={!!errors.brandName}
            helperText={errors.brandName?.message}
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
