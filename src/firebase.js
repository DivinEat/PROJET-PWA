import firebase from 'firebase/app';

import 'firebase/database';

export function initFirebase() {
  firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });
} 

export function subscribeList(path = '/', cb = () => {}) {
  const database = firebase.database();
  let list = [];
  database.ref().child(path)
    .on('child_added', (data) => {
      list.push(data);
      cb(list);
    });
  database.ref().child(path)
    .on('child_removed', (data) => {
      list = list.filter(item => item.key !== data.key);
      cb(list);
    });
}

export function pushData(path = '/', data) {
  const database = firebase.database();
  const key = database.ref().child(path).push().key;
  database.ref(`${path}/${key}`).set(data);
  return key;
}

export function setData(path = '/', data) {
  const database = firebase.database();
  return database.ref(path).set(data);
}
