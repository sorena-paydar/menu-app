'use client';

import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Skeleton } from '@/components/skeleton';
import { CreateItemInputs, Item } from '@/types/item';
import {
  DELETE_ITEM_EP,
  GET_ITEM_DETAILS_EP,
  PUT_EDIT_ITEM_DETAILS_EP,
} from '@/app/items/API/endpoint';
import { format } from 'date-fns';
import { LoadingButton } from '@mui/lab';
import withAuth from '@/hoc/withAuth';
import { ROUTES } from '@/constants/routes';
import { delay } from 'lodash';
import { Button, TextField } from '@mui/material';
import { Popup } from '@/components/popup';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { itemSchema } from '@/app/items/constants';
import { Retry } from '@/components/retry';
import { useRouter } from 'next/navigation';

function ItemDetails({ params: { itemId } }: { params: { itemId: string } }) {
  const { generateSnackbar } = useSnackbar();

  const router = useRouter();

  const [item, setItem] = useState<Item>();

  const { request: getItemDetailsRequest, pending: getItemDetailsPending } =
    useAPI({
      method: 'get',
      route: GET_ITEM_DETAILS_EP({ itemId }),
      successCallback: ({ data }) => {
        setItem(data);
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
    getItemDetailsRequest();
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemInputs>({
    resolver: yupResolver(itemSchema),
  });

  const { request: deleteItemRequest, pending: deleteItemPending } = useAPI({
    method: 'delete',
    route: DELETE_ITEM_EP({ itemId }),
    successCallback: () => {
      generateSnackbar({
        message: 'Item deleted successfully.',
        variant: 'success',
      });
      delay(() => router.push(ROUTES['items']), 1000);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const { request: editItemRequest, pending: editItemPending } = useAPI({
    method: 'put',
    route: PUT_EDIT_ITEM_DETAILS_EP({ itemId }),
    successCallback: ({ data }) => {
      generateSnackbar({
        message: 'Item edited successfully.',
        variant: 'success',
      });
      setItem(data);
      endEditing();
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  const {
    isOpen: isEditing,
    onClose: endEditing,
    onOpen: editMode,
  } = useToggle();

  const onSubmit = (data: CreateItemInputs) => {
    editItemRequest(data);
  };

  if (getItemDetailsPending || !item) {
    return (
      <div className="px-5 mt-8">
        <Skeleton />
      </div>
    );
  }

  if (!item) {
    return <Retry />;
  }

  return (
    <main className="flex flex-col px-5 mt-8">
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3">
        <div className="flex gap-x-3">
          <span className="text-gray-400">Name: </span>
          <h4>{item.name}</h4>
        </div>

        <div className="flex gap-x-3">
          <span className="text-gray-400">Price: </span>
          <span>${item.price}</span>
        </div>

        <div className="flex gap-x-3">
          <span className="text-gray-400">Description: </span>
          <span>{item.description}</span>
        </div>

        <div className="flex gap-x-3">
          <span className="text-gray-400">Created At: </span>
          <span>{format(item.createdAt, 'MMMM do, yyyy')}</span>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-x-3">
        <Button variant="contained" onClick={() => editMode()}>
          Edit Item
        </Button>

        <LoadingButton
          variant="contained"
          color="error"
          loading={deleteItemPending}
          onClick={() => deleteItemRequest()}
        >
          Delete Item
        </LoadingButton>
      </div>

      <Popup open={isEditing} onClose={endEditing} title="Edit Item Details">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
            <TextField
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <div className="flex gap-x-3">
              <TextField
                label="Price"
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                label="Picture"
                {...register('picture')}
                error={!!errors.picture}
                helperText={errors.picture?.message}
              />
            </div>
            <TextField
              label="Description"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              multiline
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={editItemPending}
            >
              Edit Item
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}

export default withAuth(ItemDetails);
