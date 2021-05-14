import Swal from 'sweetalert2'

import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";

//Tarea asincrona
export const startLoginEmailPassword = (email , password) => {
    return( dispatch ) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then( ({user}) => {
            dispatch(
                login(user.uid, user.displayName)
            );

            dispatch(finishLoading());

        }).catch( e => {
            dispatch(startLoading());
            Swal.fire(
                'Error',
                e.message,
                'error'
            );
        }); 

    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup(  googleAuthProvider )
        .then( ({ user }) => {
            dispatch(
               login(user.uid, user.displayName)
            );
        });
        
    };
}
/*
const action = {
    type: types.login,
    payload: {
        uid,
        displayName
    }
}
*/
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

/*export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}*/

// ----- Tarea asincrona -----
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return (dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async({ user }) => {

            await user.updateProfile({ displayName: name });
            // se genera el dispatch para almacenar la data en el store
            dispatch(
               login(user.uid, user.displayName)
            );
        }).catch( e => {
            console.log(e);
            Swal.fire(
                'Error',
                e.message,
                'error'
            );
        });
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await firebase.auth().signOut();
       
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})


