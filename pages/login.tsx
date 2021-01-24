import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useUser } from '../lib/context/auth-context';
import fireclient from '../lib/firebase/client';
import styles from '../styles/Login.module.scss';

interface FormFields {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid e-mail!')
    .required('The email is required!') as any,
  password: yup
    .string()
    .min(6, 'The password must have at least 6 digits!')
    .max(24, 'The password must have 24 digits!')
    .required('Password field is required!') as any,
});

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useUser();

  useEffect(() => {
    if (user && !user.pending) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  async function onSubmit(values: FormFields, actions: FormikHelpers<FormFields>) {
    try {
      const { data } = await axios.post('/api/login', { ...values });

      if (data.email) {
        setUser(data);
      }

      //
    } catch (error) {

    } finally {
      actions.setSubmitting(false);
    }
  }

  function signinWithGoogle() {
    const provider = new fireclient.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    fireclient.auth().signInWithRedirect(provider);

    localStorage.setItem('google_signin', 'true');
  }

  return (
    <section className={styles.login_container}>
      <div style={{ maxWidth: '37rem' }}>
        <h1 className={styles.login_text}>Log-in with your account</h1>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={
            (values, actions) => {
              onSubmit({ ...values }, actions);
            }
          }
          validationSchema={schema}
        >
          {({ handleBlur, handleChange, isSubmitting }) => (
            <Form>
              <label htmlFor="email">
                <p>E-Mail:</p>
                <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} />
              </label>

              <label htmlFor="password">
                <span>
                  <p>Password:</p>
                  <p>Forgot your password?</p>
                </span>
                <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
              </label>

              <button className={styles.login_btn} type="submit">
                {isSubmitting ? (
                  <i className="mdi mdi-loading mdi-spin" />
                ) : (
                  'Login'
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles.login_divider} />

        <button onClick={signinWithGoogle} className={styles.g_login} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 533.5 544.3">
            <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" />
            <path fill="#34a853" d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" />
            <path fill="#fbbc04" d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" />
            <path fill="#ea4335" d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" />
          </svg>
          <p>Login with Google</p>
        </button>
      </div>
    </section>
  );
};

export default Login;
