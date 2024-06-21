'use client';

import { CreateItemInputs, Item } from '@/types/item';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAPI from '@/hooks/useAPI';
import {
  GET_ITEM_DETAILS_EP,
  POST_CREATE_ITEM_EP,
} from '@/app/items/API/endpoint';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Popup } from '@/components/popup';
import { useToggle } from '@/hooks/useToggle';
import { itemSchema } from '@/app/items/constants';
import { Skeleton } from '@/components/skeleton';
import withAuth from '@/hoc/withAuth';
import { useItems } from '@/hooks/useItems';
import { ItemPreview } from '@/app/items/components/preview';
import { ROUTES } from '@/constants/routes';

function Items() {
  const { generateSnackbar } = useSnackbar();

  const { items, getItemsPending, setItems } = useItems();

  const { isOpen, onClose, onOpen } = useToggle();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemInputs>({
    resolver: yupResolver(itemSchema),
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

      {getItemsPending ? (
        <Skeleton />
      ) : items.length === 0 ? (
        <div className="flex flex-col gap-y-3 items-center justify-center mt-8">
          <Typography variant="h6">You have no Items!</Typography>
          <Typography variant="body1">Create one!</Typography>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-y-3">
          {items.map((item) => (
            <ItemPreview key={item._id} {...item} />
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

export default withAuth(Items);
