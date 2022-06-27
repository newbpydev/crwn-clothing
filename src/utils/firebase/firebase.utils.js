import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//# Firebase Config
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Z15MQtjE4aRoJnGnkoBINoRMwjqI1M8",
  authDomain: "crwn-clothing-db-f6251.firebaseapp.com",
  projectId: "crwn-clothing-db-f6251",
  storageBucket: "crwn-clothing-db-f6251.appspot.com",
  messagingSenderId: "639362127614",
  appId: "1:639362127614:web:ceeba0f413e50c5f62b7af",
};

//# Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//# FireStore DB
export const db = getFirestore();

//* Create user document from auth and add to firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (!userAuth) return;

  //* create reference of the user from auth
  const userDocRef = doc(db, "users", userAuth.uid);

  //* check if it exists in the db
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //* if user data does not exist
  if (!userSnapshot.exists()) {
    //   create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exists
  //   return userDocRef
  return userDocRef;
};

//# Create Auth User With Email and Password...
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}
