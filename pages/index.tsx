import { Container, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// To prevente redirection
const preventDefault = (f) => (e) => {
  e.preventDefault();
  f(e);
};

export default function Home() {
  const handlerShortening = preventDefault(async () => {
    const schema = await yup.object().shape({
      url: yup.string().trim().url().required(),
    });

    const field = await document.getElementById('url');
    const url = field.value;

    const valid = await schema.validate({ url });

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const req = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    const res = await req.json();

    const resField = document.getElementById('response');

    resField.value = `https://tidis.net/${res.a_alias}`;
  });

  return (
    <section className={styles.container}>
      <h1 id={styles.logo}>TIDIS</h1>
      <p className={styles.slogan}>An open source and privacy first url shortener.</p>
      <div className={styles['form-container']} style={{ margin: 'auto', marginTop: '7%' }}>
        <form onSubmit={handlerShortening} method="post">
          <Container fluid>
            <Row noGutters style={{ marginBottom: '10px' }}>
              <Col style={{ paddingRight: '5px' }}>
                <input
                  type="url"
                  name="url"
                  id="url"
                  className={styles.url}
                  placeholder="Paste your longer URL here!"
                  required
                  aria-placeholder="Paste your longer URL here!"
                />
              </Col>
              <Col xs={3} md={3} xl={2}>
                <input type="submit" value="Shorten!" className={styles.Shorten} aria-label="Shorten!" />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <div className={styles['response-field']}>
                  <p>Your shortened URL:</p>
                  <input type="text" id="response" />
                </div>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </section>
  );
}
