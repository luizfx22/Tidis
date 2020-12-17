import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <section className={styles.container}>
      <h1 id={styles.logo}>TIDIS</h1>
      <p className={styles.slogan}>An open source and privacy first url shortener.</p>
      <div className={styles['form-container']} style={{ margin: 'auto', marginTop: '7%' }}>
        <form action="/api/shorten" method="post">
          <Container fluid>
            <Row noGutters>
              <Col style={{ paddingRight: '5px' }}>
                <input
                  type="url"
                  name="url"
                  id="url"
                  className={styles.url}
                  placeholder="Paste your longer URL here!"
                  required
                />
              </Col>
              <Col xs={3} md={3} xl={2}>
                <input type="submit" value="Shorten" className={styles.Shorten} />
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </section>
  );
}
