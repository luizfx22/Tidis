import Link from 'next/link';
import { useUser } from '../../lib/context/auth-context';
import styles from './header.module.scss';

const Header = () => {
  const [user] = useUser();

  return (
    <>
      <div className={styles.spacer} />

      <header className={styles.header}>

        <nav>
          <figure className={styles.logo}>
            <img src="/logo.png" alt="Tidis logo" />
          </figure>

          <ul>
            <li>
              <Link href="/">
                <p>Home</p>
              </Link>
            </li>

            <li>
              <Link href={user ? '/dashboard' : '/login'}>
                <p>Dashboard</p>
              </Link>
            </li>

            <li>
              {user && (
                <div className={styles.profile} />
              )}

              {!user && (
                <li>
                  <Link href="/login">
                    <span className={styles.login}>
                      <p>Sign in</p>

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Link>
                </li>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
