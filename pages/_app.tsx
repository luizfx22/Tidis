import { AppProps } from 'next/app';
import { AuthProvier } from '../lib/context/auth-context';
import 'bulma';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvier>
      <Component {...pageProps} />
    </AuthProvier>
  );
}

export default MyApp;
