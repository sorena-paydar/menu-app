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
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import withAuth from '@/hoc/withAuth';
import { Category, CreateCategoryInput } from '@/types/category';
import {
  GET_CATEGORIES_EP,
  POST_CREATE_CATEGORY_EP,
} from '@/app/categories/API/endpoint';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { CreateItemInputs } from '@/types/item';
import { yupResolver } from '@hookform/resolvers/yup';
import { createItemSchema } from '@/app/items/constants';
import { createCategorySchema } from '@/app/categories/constants';
import { useItems } from '@/hooks/useItems';
import { ItemPreview } from '@/app/items/components/preview';
import { CreateCategoryItems } from '@/app/categories/components/items';

function Categories() {
  const { generateSnackbar } = useSnackbar();

  const [categories, setCategories] = useState<Category[]>([]);

  const { request: getCategoriesRequest, pending: getCategoriesPending } =
    useAPI({
      method: 'get',
      route: GET_CATEGORIES_EP,
      successCallback: ({ data }) => {
        setCategories(data);
      },
      failedCallback: (error: { message: string }) => {
        generateSnackbar({
          message: error.message,
          variant: 'error',
        });
      },
    });

  useEffect(() => {
    getCategoriesRequest();
  }, []);

  const { isOpen, onClose, onOpen } = useToggle();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCategoryInput>({
    resolver: yupResolver(createCategorySchema),
  });

  const { request: createCategoryRequest, pending: createCategoryPending } =
    useAPI({
      method: 'post',
      route: POST_CREATE_CATEGORY_EP,
      successCallback: ({ data }) => {
        setCategories((prevState) => [...prevState, data]);
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

  const onSubmit = (data: CreateCategoryInput) => {
    createCategoryRequest(data);
  };

  return (
    <main className="flex flex-col px-5 mt-8">
      <Typography variant="h5">List of Categories</Typography>

      {getCategoriesPending && <Skeleton />}

      {categories.length > 0 && (
        <div className="mt-4 flex flex-col gap-y-3">
          {categories.map((category) => (
            <div
              className="relative flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3"
              key={category._id}
            >
              <div className="flex gap-x-3">
                <span className="text-gray-400">Name: </span>
                <h4>{category.name}</h4>
              </div>

              <div className="flex gap-x-3">
                <span className="text-gray-400">Created At: </span>
                <span>{format(category.createdAt, 'MMMM do, yyyy')}</span>
              </div>

              <div className="flex gap-x-3">
                <span className="text-gray-400">Items Count: </span>
                <h4>{category.items.length}</h4>
              </div>

              <Link
                href={ROUTES['categories'] + `/${category._id}`}
                className="absolute top-1 right-1"
              >
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Link>
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
          Create Category
        </Button>
      </div>

      <Popup open={isOpen} onClose={onClose} title="Create New Category">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-3">
            <TextField
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <CreateCategoryItems
              name={'items'}
              control={control}
              errorMessage={errors.items?.message}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={createCategoryPending}
            >
              Create New Category
            </LoadingButton>
          </div>
        </form>
      </Popup>
    </main>
  );
}

export default withAuth(Categories);
