'use client';

import { useProfile } from '@/hooks/useProfile';
import { Loading } from '@/components/loading';
import { Retry } from '@/components/retry';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAuthComponent = (props: P) => {
    const { pending, error } = useProfile();

    if (pending) {
      return <Loading />;
    }

    if (error) {
      return <Retry />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
