'use client';

import Typography from '@mui/material/Typography';
import useAPI from '@/hooks/useAPI';
import { GET_BRANCHES_EP, POST_CREATE_BRANCH_EP } from '@/API/endpoint';
import { Button, Divider, IconButton, TextField } from '@mui/material';
import { useToggle } from '@/hooks/useToggle';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Branch, CreateBranchInputs } from '@/types/branch';
import { branchSchema } from '@/constants/branch';
import { Popup } from '@/components/popup';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/skeleton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import withAuth from '@/hoc/withAuth';

function Home() {
  const [branches, setBranches] = useState<Branch[]>([]);

  const { request: getBranchesRequest, pending: getBranchesPending } = useAPI({
    method: 'get',
    route: GET_BRANCHES_EP,
    successCallback: ({ data }) => {
      setBranches(data);
    },
  });

  useEffect(() => {
    getBranchesRequest();
  }, []);

  const { generateSnackbar } = useSnackbar();

  const { isOpen, onClose, onOpen } = useToggle();

  const {
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

  const {
    request: createBranchRequest,
    pending: createBranchPending,
    error,
  } = useAPI({
    method: 'post',
    route: POST_CREATE_BRANCH_EP,
    successCallback: ({ data }) => {
      generateSnackbar({
        message: 'Branch created successfully.',
        variant: 'success',
      });

      setBranches((prevState) => [...prevState, data]);
      reset();
      onClose();
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({ message: error.message, variant: 'error' });
    },
  });

  const onSubmit = (data: CreateBranchInputs) => {
    createBranchRequest(data);
  };

  return (
    <main className="flex flex-col px-5 relative">
      <div className="flex justify-between items-center mt-8">
        <Typography variant="h5">Branches</Typography>

        <Button
          variant="contained"
          color="success"
          endIcon={<AddIcon />}
          onClick={() => onOpen()}
        >
          <Typography variant="body1">Add</Typography>
        </Button>
      </div>
      {getBranchesPending ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-y-3 mt-4">
          {branches.map((branch) => (
            <Link href={ROUTES['branches'] + `/${branch._id}`} key={branch._id}>
              <div className="border border-gray-200 rounded-lg px-3 py-2">
                <div className="flex justify-between items-center">
                  <Typography variant="body1">{branch.name}</Typography>

                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>

                <Typography variant="body2" color="textSecondary">
                  {branch.location.address}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Divider className="mt-4" />

      <Link href={ROUTES['items']}>
        <div className="flex justify-between items-center mt-6">
          <Typography variant="h5">Items</Typography>

          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </Link>

      <Divider className="mt-4" />

      <Link href={ROUTES['categories']}>
        <div className="flex justify-between items-center mt-6">
          <Typography variant="h5">Categories</Typography>

          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </Link>

      <Divider className="mt-4" />

      <Link href={ROUTES['groups']}>
        <div className="flex justify-between items-center mt-6">
          <Typography variant="h5">Groups</Typography>

          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </Link>

      <Popup open={isOpen} onClose={onClose} title="Create New Branch">
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <LoadingButton
              type="submit"
              variant="contained"
              loading={createBranchPending}
            >
              Create New Branch
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}

export default withAuth(Home);
