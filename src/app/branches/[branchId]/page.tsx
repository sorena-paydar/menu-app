'use client';

import { useEffect, useState } from 'react';
import { Branch, CreateBranchInputs } from '@/types/branch';
import useAPI from '@/hooks/useAPI';
import { GET_BRANCH_EP, PUT_EDIT_BRANCH_EP } from '@/app/branches/API/endpoint';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Skeleton } from '@/components/skeleton';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { branchSchema } from '@/constants/branch';
import Typography from '@mui/material/Typography';

export default function BranchDetails({
  params: { branchId },
}: {
  params: { branchId: string };
}) {
  const {
    isOpen: isEditing,
    onClose: endEditing,
    onToggle: toggleEditBtn,
  } = useToggle();

  const { generateSnackbar } = useSnackbar();

  const [branch, setBranch] = useState<Branch>();

  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBranchInputs>({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      location: {
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
    },
  });

  const { request: getBranchDetailsRequest, pending: getBranchDetailsPending } =
    useAPI({
      method: 'get',
      route: GET_BRANCH_EP({ branchId }),
      successCallback: ({ data }) => {
        setBranch(data);
        setValue('name', data?.name);
        setValue('location', data?.location);
      },
      failedCallback: (error: { message: string }) => {
        generateSnackbar({
          message: error.message,
          variant: 'error',
        });
      },
    });

  useEffect(() => {
    getBranchDetailsRequest();
  }, []);

  const { request: editBranchRequest, pending: editBranchPending } = useAPI({
    method: 'put',
    route: PUT_EDIT_BRANCH_EP({ branchId }),
    successCallback: ({ data }) => {
      generateSnackbar({
        message: 'Branch edited',
        variant: 'success',
      });
      setBranch(data);
      setValue('name', data?.name);
      setValue('location', data?.location);
      endEditing();
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const onSubmit = (data: any) => {
    editBranchRequest(data);
  };

  if (getBranchDetailsPending) {
    return (
      <div className="px-5 mt-8">
        <Skeleton />
      </div>
    );
  }

  return (
    <main className="flex flex-col px-5 mt-8">
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3">
        <div className="flex gap-x-3">
          <span className="text-gray-400">Branch Name: </span>
          <h4>{branch?.name}</h4>
        </div>

        <div className="flex gap-x-3">
          <span className="text-gray-400">Location: </span>
          <span>{branch?.location.address}</span>
        </div>
      </div>

      {!isEditing && (
        <div className="flex justify-end mt-4">
          <Button
            variant="contained"
            color="info"
            onClick={() => toggleEditBtn()}
          >
            Edit Branch
          </Button>
        </div>
      )}

      {isEditing && (
        <div className="mt-8">
          <Typography variant="h5">Edit Branch Details</Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <div className="flex flex-col gap-y-3">
              <TextField
                label="Name"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Address"
                {...register('location.address')}
                error={!!errors.location?.address}
                helperText={errors.location?.address?.message}
              />
            </div>

            <div className="flex gap-x-3 justify-end mt-4">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => endEditing()}
                disabled={editBranchPending}
              >
                Discard
              </Button>

              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={editBranchPending}
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
