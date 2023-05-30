import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmail, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuth = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        delete result.ok;
        dispatch( login(result) );
    }
}

export const startEmailAndPasswordSignIn = ( { email, password, displayName}  ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail( { email, password, displayName } );
        if( !ok ) return dispatch( logout( { errorMessage } ) );
        dispatch( login( { uid, displayName, email, photoURL } ) );
    }
}

export const startLoginWithEmailAndPassword = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const { displayName, uid, photoURL, errorMessage, ok } = await loginWithEmailAndPassword( email, password );
        if( !ok ) return dispatch( logout( { errorMessage } ) );
        dispatch( login( { uid, displayName, email, photoURL } ) );
    }
}

export const startLogoutFirebase = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch( logout({}) )
    }
}