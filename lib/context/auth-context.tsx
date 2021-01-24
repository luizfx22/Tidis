import {
  createContext, useContext,
  useState, Dispatch, SetStateAction,
  FC, useEffect, useCallback,
} from 'react';
import axios from 'axios';
import fireclient from '../firebase/client';

export interface LoginData {
  user?: string
  email?: string
  picture?: string
  pending?: boolean
}

type AuthContextProps = [LoginData, Dispatch<SetStateAction<LoginData>>];

const AuthContext = createContext<AuthContextProps>([] as any);

export function useUser() {
  return useContext(AuthContext);
}

export const AuthProvier: FC = ({ children }) => {
  const [user, setUser] = useState<LoginData>({ pending: true });

  useEffect(() => {
    if (!user) {
      axios.post('/api/logout')
        .catch(() => {});
    }
  }, [user]);

  const handleGoogleRedirect: () => Promise<void> = useCallback(async () => {
    localStorage.removeItem('google_signin');

    const { user: client } = await fireclient.auth().getRedirectResult();

    if (!client) {
      setUser(null);
      return;
    }

    setUser({
      email: client.email,
      picture: client.photoURL,
      user: client.displayName,
    });

    client.getIdToken()
      .then((idToken) => {
        axios.post('/api/fb-login', { idToken });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    const isGoogleSigin = localStorage.getItem('google_signin');

    if (isGoogleSigin === 'true') {
      handleGoogleRedirect();
      return;
    }

    axios.post('/api/fb-verify')
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// async function handleGoogleRedirect(setUser: Dispatch<SetStateAction<LoginData>>) {
//   try {
//     const { user: client } = await fireclient.auth().getRedirectResult();

//     if (!client) {
//       setUser({ ...user, await_google: false });
//       return;
//     }

//     setUser({ email: client.email, picture: client.photoURL, user: client.displayName });

//     client.getIdToken()
//       .then((idToken) => {
//         axios.post('/api/fb-login', { idToken });
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     //
//   } catch ({ code }) {
//     // console.log(code);
//   }
// }
