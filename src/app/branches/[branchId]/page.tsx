'use client';

import { useEffect, useRef, useState } from 'react';
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
import withAuth from '@/hoc/withAuth';
import { Retry } from '@/components/retry';
import { GroupList } from '@/components/groupList';
import QRCode from 'qrcode.react';
import { Popup } from '@/components/popup';
import { ROUTES } from '@/constants/routes';

function BranchDetails({
  params: { branchId },
}: {
  params: { branchId: string };
}) {
  const qrCodeValue = window.location.origin + ROUTES['final'] + '/' + branchId;

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
    control,
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
        reset(data);
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

  const onSubmit = (data: CreateBranchInputs) => {
    editBranchRequest(data);
  };

  if (getBranchDetailsPending) {
    return (
      <div className="px-5 mt-8">
        <Skeleton />
      </div>
    );
  }

  if (!branch) {
    return <Retry />;
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

      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          color="info"
          onClick={() => toggleEditBtn()}
        >
          Edit Branch
        </Button>
      </div>

      <div className="mt-20 flex  flex-col  items-center justify-center">
        <QRCode value={qrCodeValue} size={256} />

        <Typography className="mt-5" variant="h5">
          Scan me :D
        </Typography>
      </div>

      <Popup open={isEditing} onClose={endEditing} title="Edit Branch Details">
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

            <GroupList
              name="menuGroup"
              setValue={setValue}
              control={control}
              errorMessage={errors.menuGroup?.message}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-grey-200">
            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              loading={editBranchPending}
            >
              Submit
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}

export default withAuth(BranchDetails);
