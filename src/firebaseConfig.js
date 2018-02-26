import * as firebase from 'firebase'

var config = {
    apiKey: 'AIzaSyAtYDJn0gbF88ReFYIAi_F1EBTcl3rAGTE',
    authDomain: 'washr-data.firebaseapp.com',
    databaseURL: 'https://washr-data.firebaseio.com',
    projectId: 'washr-data',
    storageBucket: 'washr-data.appspot.com',
    messagingSenderId: '700840172175'
  }
  const app = firebase.initializeApp(config)
export default app

