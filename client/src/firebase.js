import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDQndNq6ZLI715XiXf5DJvm3g6iKVSyaMM',
	authDomain: 'dcode-community-11ff2.firebaseapp.com',
	projectId: 'dcode-community-11ff2',
	storageBucket: 'dcode-community-11ff2.appspot.com',
	messagingSenderId: '1064287537669',
	appId: '1:1064287537669:web:149e3b2716b18379f2aa6c',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
