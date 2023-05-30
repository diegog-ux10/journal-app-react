import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import {  FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { setNotes } from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        
        dispatch( savingNewNote() );

        const {uid} = getState().auth;

        console.log('new note')
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('The Uid does not  Exists');

        const notes = await loadNotes(uid)

        dispatch( setNotes(notes) )
    }
}

export const startSavingActiveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        delete noteToFireStore.imageUrls;
        console.log(noteToFireStore)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore , {merge: true});
        dispatch( updateNote(note) )
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch(setSaving());
        console.log(files)
        console.log('Upload photos here!');
        // const filesUploadPromises = [];
        // for (const file of files) {
        //     filesUploadPromises.push(fileUpload( file ))
        // }
        // const photosUrls = await Promise.all(filesUploadPromises);
        dispatch(setPhotosToActiveNote(['https://unsplash.com/es/fotos/_zabwVvTu68', 'https://unsplash.com/es/fotos/ZrOSgBOnWUQ']))
    }
}