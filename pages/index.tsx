import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../lib/context/auth-context';

// Styles
import homeStyles from '../styles/Home.module.scss';

const Index = () => {
  const [user, setUser] = useUser();
  const router = useRouter();

  return (
    <main>
      <header className={homeStyles.site_header}>
        <h1 className={homeStyles.logo_text}>
          TIDIS
        </h1>
        <div className={homeStyles.navbar}>
          <a className={`${homeStyles.nav_item} has-text-white-ter`} href="/">
            Home
          </a>

          <a className={`${homeStyles.nav_item} has-text-white-ter`} href="/dashboard">
            My dashboard
          </a>

          <Link href="/login">
            <span className={`${homeStyles.nav_item} button is-primary`}>
              Login
            </span>
          </Link>
        </div>
      </header>
      <main className={homeStyles.site_index} />
    </main>
  );
};

export default Index;
