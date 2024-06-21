import {
  useSnackbar as useNotistackSnackbar,
  SnackbarProvider,
  VariantType,
} from 'notistack';

type Snackbar = {
  message: string;
  variant?: VariantType;
  autoHideDuration?: number;
};

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const generateSnackbar = ({
    message,
    variant = 'default',
    autoHideDuration = 3000,
  }: Snackbar) => {
    try {
      enqueueSnackbar(message, { variant, autoHideDuration });
    } catch (err) {
      enqueueSnackbar('Something went wrong', { variant, autoHideDuration });
    }
  };

  return {
    generateSnackbar,
  };
};

export { SnackbarProvider, useSnackbar };
