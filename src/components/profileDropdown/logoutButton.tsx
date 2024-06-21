import React from 'react';
import useAPI from '@/hooks/useAPI';
import { POST_LOGOUT_EP } from '@/API/endpoint';
import { useSnackbar } from '@/hooks/useSnackbar';
import { LoadingButton } from '@mui/lab';
import { COOKIES } from '@/constants/auth';
import Cookies from 'js-cookie';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const { generateSnackbar } = useSnackbar();

  const { request: logoutRequest, pending } = useAPI({
    method: 'post',
    route: POST_LOGOUT_EP,
    successCallback: ({ data }) => {
      Cookies.remove(COOKIES['authToken']);
      router.push(ROUTES['register']);
    },
    failedCallback: (error: { message: string }) => {
      generateSnackbar({
        message: error.message,
        variant: 'error',
      });
    },
  });

  return (
    <LoadingButton
      variant="outlined"
      color="error"
      fullWidth
      size="small"
      onClick={() => logoutRequest()}
      loading={pending}
    >
      Logout
    </LoadingButton>
  );
};
