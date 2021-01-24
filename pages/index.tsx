// Code components
import { FormEvent, Component } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Axios from 'axios';
import * as yup from 'yup';
import { Alert } from 'react-bootstrap';

// External HTML components
import { useUser } from '../lib/context/auth-context';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mdi/font/css/materialdesignicons.css';
import homeStyles from '../styles/Home.module.scss';

const Index = () => {
  const [user, setUser] = useUser();
  const router = useRouter();

  return (
    <main>
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

        {/* <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tidis.net/" />
        <meta property="twitter:title" content="Tidis: An open source and privacy first url shortener." />
        <meta property="twitter:description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />
        {/* <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35</meta>f34a46c97a2c9f6f7dd7d336f2.png" /> */}
        <title>Tidis: An open source and privacy first url shortener.</title>
      </Head>
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

          <button className={`${homeStyles.nav_item} button is-primary`} type="button" onClick={() => { router.push('/login'); }}>
            Login
          </button>
        </div>
      </header>
      <main className={homeStyles.site_index} />
    </main>
  );
};

export default Index;
