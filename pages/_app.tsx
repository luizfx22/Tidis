import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvier } from '../lib/context/auth-context';
import LoadingWrap from '../component/fs-loading/loading-wrap';

import 'bulma';
import 'tailwindcss/tailwind.css';
import '@mdi/font/css/materialdesignicons.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvier>
      <Head>
        <title>Tidis: An open source and privacy first url shortener.</title>
        <meta name="title" content="Tidis: An open source and privacy first url shortener." />
        <meta name="description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tidis.net/" />
        <meta property="og:title" content="Tidis: An open source and privacy first url shortener." />
        <meta property="og:description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="android-chrome" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="android-chrome" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#485563" />
        <meta name="theme-color" content="#485563" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tidis.net/" />
        <meta property="twitter:title" content="Tidis: An open source and privacy first url shortener." />
        <meta property="twitter:description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />

        <title>Tidis: An open source and privacy first url shortener.</title>
      </Head>

      <LoadingWrap>
        <Component {...pageProps} />
      </LoadingWrap>
    </AuthProvier>
  );
}

export default MyApp;
