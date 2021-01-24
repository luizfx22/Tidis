import { useEffect } from 'react';
import { useUser } from '../../lib/context/auth-context';
import FullscrenLoading from './fs-loading';

const LoadingWrap = ({ children }) => {
  const [user] = useUser();

  useEffect(() => {
    console.log('USER', user);
  }, [user]);

  return (
    <>
      <FullscrenLoading visible={user?.pending || user?.await_google} />
      {children}
    </>
  );
};

export default LoadingWrap;
