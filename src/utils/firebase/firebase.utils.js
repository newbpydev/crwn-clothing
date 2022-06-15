import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//# FireStore DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //* create reference of the user from auth
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  //* check if it exists in the db
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exist
  if (!userSnapshot.exists()) {
    //   create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  // if user data exists
  //   return userDocRef
  return userDocRef;
};
