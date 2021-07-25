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
        console.log("Child added");
        list.push(data);
      cb(list);
    });
  database
    .ref()
    .child(path)
    .on("child_removed", (data) => {
      console.log("Child removed");
      list = list.filter((item) => item.key !== data.key);
      cb(list);
    });
}

export function subscribeDoc(path = "/", cb = () => {}) {
  const database = firebase.database();
  database.ref(path)
  .on('value', (snapshot) => {
      console.log("snapshot");
      console.log(snapshot.val())
    cb(snapshot.val());
  });


  // database
  //     .ref()
  //     .child(path)
  //     .on("child_changed", (snapshot) => {
  //       cb(snapshot.val());
  //     });
  // database
  //     .ref()
  //     .child(path)
  //     .on("child_removed", (snapshot) => {
  //       cb(snapshot.val());
  //     });
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
        password,
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

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(() => {
//         // Existing and future Auth states are now persisted in the current
//         // session only. Closing the window would clear any existing state even
//         // if a user forgets to sign out.
//         // ...
//         // New sign-in will be persisted with session persistence.
//         return firebase.auth().signInWithEmailAndPassword(email, password);
//     })
//     .catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });


export function connectUser(email, password) {
  const auth = firebase.auth();

  return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        return auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          page(`/`);
        })
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
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
