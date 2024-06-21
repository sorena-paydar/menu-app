'use client';

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
import { CreateCategoryInput } from '@/types/category';
import { POST_CREATE_CATEGORY_EP } from '@/app/categories/API/endpoint';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategorySchema } from '@/app/categories/constants';
import { CreateCategoryItems } from '@/app/categories/components/items';
import { useCategories } from '@/hooks/useCategories';

function Categories() {
  const { generateSnackbar } = useSnackbar();

  const { categories, getCategoriesPending, setCategories } = useCategories();

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

      {getCategoriesPending ? (
        <Skeleton />
      ) : categories.length === 0 ? (
        <div className="flex flex-col gap-y-3 items-center justify-center mt-8">
          <Typography variant="h6">You have no Categories!</Typography>
          <Typography variant="body1">Create one!</Typography>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-y-3">
          {categories.map((category) => (
            <Link
              href={ROUTES['categories'] + `/${category._id}`}
              key={category._id}
            >
              <div className="relative flex flex-col border border-gray-200 rounded-lg p-4 gap-y-3">
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

                <IconButton className="absolute top-1 right-1">
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            </Link>
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
