import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const dev = process.env.NODE_ENV !== 'production';

if (firebase.apps.length < 1) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBXAlSzIbljNjQeY_2S1KF57L7nsDU3odQ',
    authDomain: 'tidis-75bc9.firebaseapp.com',
    projectId: 'tidis-75bc9',
    storageBucket: 'tidis-75bc9.appspot.com',
    messagingSenderId: '269032770605',
    appId: '1:269032770605:web:fec5d81801b4a79346bca4',
  });

  if (dev) {
    firebase.firestore().useEmulator('localhost', 8080);
  }
}

export default {
  auth: firebase.auth,
};
