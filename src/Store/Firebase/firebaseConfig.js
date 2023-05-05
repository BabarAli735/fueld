import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAskOKVS7D-kHa3ivu7K6v_OYdSo7WvqMQ',
  databaseURL: 'https://fueld-a6582-default-rtdb.firebaseio.com/',
  authDomain: 'fueld-a6582.firebaseapp.com',
  projectId: 'fueld-a6582',
  storageBucket: 'fueld-a6582.appspot.com',
  messagingSenderId: '330132419174',
  appId: '1:330132419174:ios:65b64631f7feba89e973a7',
};

export default Firebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
