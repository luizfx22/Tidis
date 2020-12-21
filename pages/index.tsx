// Code components
import { FormEvent, Component, ReactDOM } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import * as yup from 'yup';

// External HTML components
import {
  Container, Row, Col, Alert,
} from 'react-bootstrap';

// Styles
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mdi/font/css/materialdesignicons.css';

// Types
interface IURLForm {
  url: string;
}

interface IState {
  form: IURLForm,
  result: string,
  invalidURL: boolean,
  requestError: boolean,
  loading: boolean,
  created: boolean,
}

export default class Index extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        url: '',
      },

      result: '',

      invalidURL: false,
      requestError: false,
      loading: false,
      created: false,
    };

    this.handleShortening = this.handleShortening.bind(this);
    this.setURL = this.setURL.bind(this);
    this.setResult = this.setResult.bind(this);
    this.setCreated = this.setCreated.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  setURL(e) {
    this.setState({ form: { url: e.target.value } });
  }

  setResult(e) {
    this.setState({ result: e.target.value });
  }

  setLoading(value: boolean) {
    this.setState({ loading: value });
  }

  setCreated(value: boolean) {
    this.setState({ created: value });
  }

  copyToClipboard() {
    const { result: alias } = this.state;

    const text = `https://tidis.net/${alias}`;

    const fallbackCopyTextToClipboard = () => {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log(`Fallback: Copying text command was ${msg}`);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    };

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard();
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      console.log('Async: Copying to clipboard was successful!');
    }, (err) => {
      console.error('Async: Could not copy text: ', err);
    });
  }

  showInvalidURLAlert(callback: Function = undefined) {
    this.setState({ invalidURL: true }, () => {
      window.setTimeout(() => {
        this.setState({ invalidURL: false });

        // Executes callback
        if (callback) {
          callback();
        }
      }, 5500);
    });
  }

  showRequestErrorAlert(callback: Function = undefined) {
    this.setState({ invalidURL: true }, () => {
      window.setTimeout(() => {
        this.setState({ invalidURL: false });

        // Executes callback
        if (callback) {
          callback();
        }
      }, 5500);
    });
  }

  showCreatedAlert(callback: Function = undefined) {
    this.setState({ created: true }, () => {
      window.setTimeout(() => {
        this.setState({ created: false });

        // Executes callback
        if (callback) {
          callback();
        }

        //
      }, 10500);
    });
  }

  async handleShortening(event: FormEvent) {
    event.preventDefault();

    this.setLoading(true);

    const { form } = this.state;
    const { url } = form;

    const schema = yup.object().shape({
      url: yup.string().trim().url().required(),
    });

    try {
      await schema.validate({ url });
    } catch (error) {
      this.showInvalidURLAlert(() => {
        this.setLoading(false);
      });

      return false;
    }

    try {
      const { data } = await Axios.post('/api/shorten', { url }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({ result: data.a_alias });

      this.copyToClipboard();
      this.showCreatedAlert();

      this.setLoading(false);

      return true;

      //
    } catch (error) {
      this.showInvalidURLAlert(() => {
        this.setLoading(false);
      });

      return false;
    }
  }

  render() {
    const {
      form: { url }, result, invalidURL, requestError, loading, created,
    } = this.state;
    return (
      <div>
        <Head>
          <title>Tidis: An open source and privacy first url shortener.</title>
          <meta name="title" content="Tidis: An open source and privacy first url shortener." />
          <meta name="description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tidis.net/" />
          <meta property="og:title" content="Tidis: An open source and privacy first url shortener." />
          <meta property="og:description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />
          {/* <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://tidis.net/" />
          <meta property="twitter:title" content="Tidis: An open source and privacy first url shortener." />
          <meta property="twitter:description" content="With Tidis you can shorten your links without tracking, ads or anything harmful for your privacy." />
          {/* <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35</meta>f34a46c97a2c9f6f7dd7d336f2.png" /> */}
          <title>Tidis: An open source and privacy first url shortener.</title>
        </Head>
        <section className={styles.container}>
          <h1 id={styles.logo}>
            TIDIS
          </h1>
          <p className={styles.slogan}>An open source and privacy first url shortener.</p>
          <div className={styles['form-container']} style={{ margin: 'auto', marginTop: '7%' }}>
            <form onSubmit={this.handleShortening} method="post">
              <Container fluid>
                <Row noGutters style={{ marginBottom: '10px' }}>
                  <Col style={{ paddingRight: '5px' }}>
                    <input
                      type="url"
                      name="url"
                      id="url"
                      value={url}
                      onChange={this.setURL}
                      className={styles.url}
                      placeholder="Paste your longer URL here!"
                      required
                      disabled={loading}
                      aria-placeholder="Paste your longer URL here!"
                    />
                  </Col>
                  <Col xs={3} sm={4} md={3} xl={2}>
                    <input
                      type="submit"
                      value={(loading) ? 'Loading...' : 'Shorten!'}
                      disabled={loading}
                      className={styles.Shorten}
                      aria-label="Shorten!"
                    />
                  </Col>
                </Row>
                <Alert variant="danger" show={invalidURL}>
                  <i className="mdi mdi-close" style={{ paddingRight: '5px' }} />
                  <span style={{ marginBottom: '2px' }}>
                    <b>{url}</b>
                    {' '}
                    is not a valid URL!
                  </span>
                </Alert>
                <Alert variant="danger" show={requestError}>
                  <i className="mdi mdi-close" style={{ paddingRight: '5px' }} />
                  <span style={{ marginBottom: '2px' }}>
                    An error occurred while shortening the URL!
                  </span>
                </Alert>
                <Alert variant="success" show={created}>
                  This is your shortened link:
                  <Alert.Link target="_blank" href={`https://tidis.net/${result}`}>
                    {`https://tidis.net/${result}`}
                  </Alert.Link>
                  .
                  The link was copied to your clipboard!
                </Alert>
              </Container>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
