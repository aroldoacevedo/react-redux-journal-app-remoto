import { types } from "../types/types";

/*
    {
        notes: [],
        active: null,
        active: {
            id: '',
            title:'',
            body: '',
            imageUrl: '',
            date: 1234,
        }
    }
*/
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        //Obtiene el estado actual
        case types.notesActive:
            return {
                //clona el estado anterior
                ...state,
                //...action.payload es igual a payload = action.payload 
                active : {
                    ...action.payload
                }
            }

        case types.notesLoad:
            //clona el estado (lista) anterior
            return {
                ...state,
                notes : [ ...action.payload]
            }

        case types.notesUpdated:
            
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note  
                        : note
                )
            }
            
        default:
            return state;
    }

}