import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCHJxW6iYfJx-gvcHaKq5K0yxw7D-nRkXE",
  authDomain: "foreign-born.firebaseapp.com",
  databaseURL: "https://foreign-born.firebaseio.com",
  projectId: "foreign-born",
  storageBucket: "foreign-born.appspot.com",
  messagingSenderId: "536828661131"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
