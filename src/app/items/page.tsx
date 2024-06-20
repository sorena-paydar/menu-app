'use client';

import { useEffect, useState } from 'react';
import { CreateItemInputs, Item } from '@/types/item';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAPI from '@/hooks/useAPI';
import { GET_ITEMS_EP, POST_CREATE_ITEM_EP } from '@/app/items/API/endpoint';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Popup } from '@/components/popup';
import { useToggle } from '@/hooks/useToggle';
import { createItemSchema } from '@/app/items/constants';
import { format } from 'date-fns';
import { Skeleton } from '@/components/skeleton';

export default function Items() {
  const { generateSnackbar } = useSnackbar();

  const [items, setItems] = useState<Item[]>([]);

  const { request: getItemsRequest, pending: getItemsPending } = useAPI({
    method: 'get',
    route: GET_ITEMS_EP,
    successCallback: ({ data }) => {
      setItems(data);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  useEffect(() => {
    getItemsRequest();
  }, []);

  const { isOpen, onClose, onOpen } = useToggle();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemInputs>({
    resolver: yupResolver(createItemSchema),
  });

  const { request: createItemRequest, pending: createItemPending } = useAPI({
    method: 'post',
    route: POST_CREATE_ITEM_EP,
    successCallback: ({ data }) => {
      setItems((prevState) => [...prevState, data]);
      generateSnackbar({
        message: 'Item Created Successfully',
        variant: 'success',
      });
      onClose();
      reset();
    },
    failedCallback: (error: { message: string[] }) => {
      generateSnackbar({
        message: error.message[0],
        variant: 'error',
      });
    },
  });

  const onSubmit = (data: CreateItemInputs) => {
    createItemRequest(data);
  };

  return (
    <main className="flex flex-col px-5 mt-8">
      <Typography variant="h5">List of Items</Typography>

      {getItemsPending && <Skeleton />}

      {items.length > 0 && (
        <div className="mt-4 flex flex-col gap-y-3">
          {items.map((item) => (
            <div
              className="flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3"
              key={item._id}
            >
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
          Create Item
        </Button>
      </div>

      <Popup open={isOpen} onClose={onClose} title="Create New Item">
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
              loading={createItemPending}
            >
              Create New Branch
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}
