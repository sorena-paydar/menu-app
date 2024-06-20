import {
  useSnackbar as useNotistackSnackbar,
  SnackbarProvider,
  VariantType,
} from 'notistack';

type Snackbar = {
  message: string;
  variant: VariantType;
};

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const generateSnackbar = ({ message, variant = 'default' }: Snackbar) => {
    enqueueSnackbar(message, { variant });
  };

  return {
    generateSnackbar,
  };
};

export { SnackbarProvider, useSnackbar };
