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

        case types.notesActive:
            //clona el estado anterior
            return {
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
            
        default:
            return state;
    }

}