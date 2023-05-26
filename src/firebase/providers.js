import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmail = async( { email, password, displayName } ) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user;
        await updateProfile( FirebaseAuth.currentUser, {
            displayName 
        } )
        return{
            ok:true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailAndPassword = async( email, password ) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = resp.user;
        return {
            ok: true,
            displayName, photoURL, uid, email
        }
    } catch ( error ) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() =>  {
 return await FirebaseAuth.signOut();
}