import React , { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { NoteAppBar } from './NoteAppBar'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';
//Formulario que permite escribir la nota y adjuntar imagen
export const NoteScreen = () => {

    const dispatch = useDispatch();
    //active: nota activa
    const { active: note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeId = useRef( note.id )

    useEffect(() => {
        //limpia el formulario
        if( note.id !== activeId.current  ){
            reset( note );
            activeId.current  = note.id;
        }

    }, [note, reset]);

    useEffect(() => {

        /*dispatch(activeNote(formValues.id, {
            body, title, url
        }));*/
        dispatch(activeNote(formValues.id, { ...formValues }));
        
    }, [ formValues ], dispatch);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }
    
    return (
        <div className="notes__main-content">
            
            {/*menu superior*/}
            <NoteAppBar />

            {/*formulario de la nota - costado derecho*/}
            <div className="notes__content">

                <input 
                    type="text"
                    name = "title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange = { handleInputChange }
                    value= {title}
                />
            
                <textarea
                    name = "body"
                    placeholder="what happended today"
                    className="notes__textarea"
                    onChange = { handleInputChange }
                    value= {body}
                >
                </textarea>

                {   (note.url) 
                    &&
                    (<div className="notes__image">
                        <img
                        src={note.url}
                        alt="imagen"
                        />
                    </div>
                    )
                }
        
            </div>

            <button 
            className="btn btn-danger"
            onClick= { handleDelete }>
                Delete
            </button>

        </div>
    )
}
