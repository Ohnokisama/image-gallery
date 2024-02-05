import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const provider = new GoogleAuthProvider()

const AuthContext = createContext()

export function AuthContextProvider({children}) {
  const [user, setUser] = useState({})

  function signInWithGoogle() {
    return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      setDoc(doc(db, 'users', user.email), {
        savedImages: []
      })
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

   // Sign up function
   function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    setDoc(doc(db, 'users', email), {
      savedImages: []
    })
  }

  // Log in function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Log out function
  function logOut() {
    return signOut(auth)
  }

  // State change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  })

  return(
    <AuthContext.Provider value={{signInWithGoogle,signUp, logIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}