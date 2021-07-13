import firebase from "firebase/app";
import page from "page";

import "firebase/database";
import "firebase/auth";

export function initFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyCr7S7ROD5igMKfRDIz1-shXyTO2-r8VDE",
    authDomain: "projet-pwa-b88d5.firebaseapp.com",
    databaseURL:
      "https://projet-pwa-b88d5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-pwa-b88d5",
    storageBucket: "projet-pwa-b88d5.appspot.com",
    messagingSenderId: "68843173354",
    appId: "1:68843173354:web:34963a5c8bd6d02bb86e93",
  });
}

export function subscribeList(path = "/", cb = () => {}) {
  const database = firebase.database();
  let list = [];
  database
    .ref()
    .child(path)
    .on("child_added", (data) => {
      list.push(data);
      cb(list);
    });
  database
    .ref()
    .child(path)
    .on("child_removed", (data) => {
      list = list.filter((item) => item.key !== data.key);
      cb(list);
    });
}

export function pushData(path = "/", data) {
  const database = firebase.database();
  const key = database.ref().child(path).push().key;
  database.ref(`${path}/${key}`).set(data);
  return key;
}

export function setData(path = "/", data) {
  const database = firebase.database();
  return database.ref(path).set(data);
}

export function appendData(path = "/", data) {
  const database = firebase.database();
  return database.ref().child(path).push(data);
}

export function createUser(email, password) {
  const auth = firebase.auth();

  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setData(`/users/${user.uid}`, {
        email,
      });

      page(`/`);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export function connectUser(email, password) {
  const auth = firebase.auth();

  return auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      page(`/`);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export function disconnectUser() {
  const auth = firebase.auth();

  return auth
    .signOut()
    .then(() => {
      // Sign-out successful.

      page(`/login`);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
