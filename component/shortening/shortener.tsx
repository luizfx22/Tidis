import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import styles from './shortener.module.scss';

const schema = yup.object().shape({
  url: yup.string().url('Invalid url!').required('The url is required!') as any,
  slug: yup.string().lowercase().max(255) as any,
});

const shortener = () => (
  <div>
    <div className={styles.shortening_container}>
      <Formik
        initialValues={{
          url: '',
          slug: '',
        }}
        onSubmit={
            (values, actions) => {

            }
          }
        validationSchema={schema}
      >
        {({ handleBlur, handleChange, isSubmitting }) => (
          <Form className={styles.shortening_form}>
            <div className={`${styles.shortening_form_contents} columns is-mobile`}>
              <div className="column is-three-fifths">
                <label htmlFor="url">
                  <p>Your longer URL:</p>
                  <input
                    type="url"
                    name="url"
                    className={`${styles.url}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://your-link.com"
                  />
                </label>
              </div>

              <div className="column">
                <label htmlFor="slug">
                  <p>Your custom slug:</p>
                  <input
                    type="text"
                    name="slug"
                    className={`${styles.url} `}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="my awesome link"
                  />
                </label>
              </div>

              <div className="column">
                <button className={styles.Shorten} type="submit">
                  {isSubmitting ? (
                    <i className="mdi mdi-loading mdi-spin" />
                  ) : (
                    'Shorten!'
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  </div>
);

export default shortener;
