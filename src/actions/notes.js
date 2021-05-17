import Swal from 'sweetalert2';

import { types } from "../types/types";
import { db } from '../firebase/firebase-config'
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';

//react-journal

//ACTIONES
// getState : es igual al useSelector
export const startNewNote = (  ) => {
    return async(dispatch, getState) => {
        //se obtiene el reducer auth
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
        dispatch(activeNote( doc.id, newNote ));
    
    }
}

export const activeNote = (id, note) => ({
    type : types.notesActive,
    payload: {
        id,
        ...note
    }
})

//Se usa para la carga inicial
export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));        
    }
}

export const setNotes = ( notes ) => ({
    type : types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) =>{
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        if (!note.url){
            delete note.url;
        }

        const noteToFirestores = { ...note};
        delete noteToFirestores.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestores);
    
        dispatch(refreshNote( note.id, noteToFirestores ));
        Swal.fire(
            'Saved', note.title, 'success'
        );
   
    }
}

//actualiza la nota directo del store
export const refreshNote = ( id, note ) =>({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

//start  : asincrona
export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        //active == note
        const { active: activeNote } = getState().notes;
        
        Swal.fire({
            title: 'Please Wait !',
            html: 'data uploading',// add html attribute if you want or remove
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleting = ( id ) =>{
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
    
        dispatch(deleteNote(id));
    
    }
}

export const deleteNote = ( id )=> ({
    type: types.notesDelete,
    payload: id
})
