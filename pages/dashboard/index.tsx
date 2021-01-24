import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../lib/context/auth-context';

const Dashboard = () => {
  const [user, setUser] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  return (
    <div>
      {
        user?.picture
          ? (
            <div className="image is-96x96">
              <img src={user.picture} className="is-rounded" alt={`Foto de perfil de ${user.user}`} />
            </div>
          )
          : (
            <div
              className="has-background-white is-rounded image is-96x96"
              style={{
                borderRadius: '96px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="has-text-gray" style={{ width: '48px', height: '48px' }}>
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )
      }
    </div>
  );
};

export default Dashboard;
