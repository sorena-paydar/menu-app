'use client';

import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Button, IconButton, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Popup } from '@/components/popup';
import { format } from 'date-fns';
import { Skeleton } from '@/components/skeleton';
import withAuth from '@/hoc/withAuth';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { POST_CREATE_GROUP_EP } from '@/app/groups/API/endpoint';
import { CreateGroupInput, Group } from '@/types/group';
import { createGroupSchema } from '@/app/groups/constants';
import { CreateGroupCategories } from '@/app/groups/components/categories';
import { useGroups } from '@/hooks/useGroups';

function Groups() {
  const { generateSnackbar } = useSnackbar();

  const { groups, getGroupsPending, setGroups } = useGroups();

  const { isOpen, onClose, onOpen } = useToggle();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateGroupInput>({
    resolver: yupResolver(createGroupSchema),
  });

  const { request: createGroupRequest, pending: createGroupPending } = useAPI({
    method: 'post',
    route: POST_CREATE_GROUP_EP,
    successCallback: ({ data }) => {
      setGroups((prevState) => [...prevState, data]);
      onClose();
      reset();
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const onSubmit = (data: CreateGroupInput) => {
    createGroupRequest(data);
  };

  return (
    <main className="flex flex-col px-5 mt-8">
      <Typography variant="h5">List of Groups</Typography>

      {getGroupsPending ? (
        <Skeleton />
      ) : groups.length === 0 ? (
        <div className="flex flex-col gap-y-3 items-center justify-center mt-8">
          <Typography variant="h6">You have no Groups!</Typography>
          <Typography variant="body1">Create one!</Typography>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-y-3">
          {groups.map((group) => (
            <div
              className="relative flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3"
              key={group._id}
            >
              <div className="flex gap-x-3">
                <span className="text-gray-400">Name: </span>
                <h4>{group.name}</h4>
              </div>

              <div className="flex gap-x-3">
                <span className="text-gray-400">Created At: </span>
                <span>{format(group.createdAt, 'MMMM do, yyyy')}</span>
              </div>

              <div className="flex gap-x-3">
                <span className="text-gray-400">Items Count: </span>
                <h4>{group.categories.length}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 flex border-t border-gray-200 p-4 w-full">
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => onOpen()}
        >
          Create Group
        </Button>
      </div>

      <Popup open={isOpen} onClose={onClose} title="Create New Group">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
            <TextField
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <CreateGroupCategories
              name={'categories'}
              control={control}
              errorMessage={errors.categories?.message}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={createGroupPending}
            >
              Create New Group
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}

export default withAuth(Groups);
