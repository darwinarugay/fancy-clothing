import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA03fAAAP9DRvv0feKIUH1K91XjrAae0ps",
  authDomain: "fancy-clothing-db.firebaseapp.com",
  databaseURL: "https://fancy-clothing-db.firebaseio.com",
  projectId: "fancy-clothing-db",
  storageBucket: "fancy-clothing-db.appspot.com",
  messagingSenderId: "277126025080",
  appId: "1:277126025080:web:0fd1b4addf2d637ecec28d",
  measurementId: "G-8VV33YT8DE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user!", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
