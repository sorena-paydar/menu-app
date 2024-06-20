'use client';

import { useProfile } from '@/hooks/useProfile';
import { Loading } from '@/components/loading';
import { Button } from '@mui/material';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAuthComponent = (props: P) => {
    const { pending, error } = useProfile();

    if (pending) {
      return <Loading />;
    }

    if (error) {
      return <Button onClick={() => window.location.reload()}>Retry</Button>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
