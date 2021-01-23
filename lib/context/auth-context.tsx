import {
  createContext, useContext,
  useState, Dispatch, SetStateAction,
  FC, useEffect,
} from 'react';
import axios from 'axios';

export interface LoginData {
  user?: string
  email?: string
  picture?: string
  pending?: boolean;
}

type AuthContextProps = [LoginData, Dispatch<SetStateAction<LoginData>>];

const AuthContext = createContext<AuthContextProps>([] as any);

export function useUser() {
  return useContext(AuthContext);
}

export const AuthProvier: FC = ({ children }) => {
  const [user, setUser] = useState<LoginData>({ pending: true });

  useEffect(() => {
    const cookie = document.cookie.split(';')
      .filter((cook) => cook.startsWith('sid'))[0];

    if (!cookie) {
      setUser(null);
      return;
    }

    axios.post('/api/fb-verify', { sid: cookie.split('=')[1] })
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
