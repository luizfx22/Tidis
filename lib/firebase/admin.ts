import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = JSON.parse(
  Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString('utf-8'),
);

if (admin.apps.length < 1) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default {
  auth: admin.auth,
  firestore: admin.firestore,
};
