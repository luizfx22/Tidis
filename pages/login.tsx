import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LoginData, useUser } from '../lib/context/auth-context';
import fireclient from '../lib/firebase/client';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useUser();

  const handleGoogleRedirect = useCallback(async () => {
    try {
      const { user: client } = await fireclient.auth().getRedirectResult();

      if (!client) return false;

      const idToken = await client.getIdToken();

      const { data } = await axios.post('/api/fb-login', { idToken });
      const userData: LoginData = data;

      setUser(userData);

      // console.log(data);

      //
    } catch ({ code }) {
      // console.log(code);
    }
  }, [setUser]);

  useEffect(() => {
    handleGoogleRedirect();
  }, [handleGoogleRedirect]);

  useEffect(() => {
    if (user && !user.pending) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  function siginWithGoogle() {
    const provider = new fireclient.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    fireclient.auth().signInWithRedirect(provider);
  }

  return (
    <section>
      <button onClick={siginWithGoogle} type="button">Login with Google</button>
    </section>
  );
};

export default Login;
