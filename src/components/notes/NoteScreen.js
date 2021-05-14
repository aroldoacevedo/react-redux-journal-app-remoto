import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            
            {/*menu superior*/}
            <NoteAppBar />

            {/*formulario de la nota - costado derecho*/}
            <div className="notes__content">

                <input 
                type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"/>
            
                <textarea
                    placeholder="what happended today"
                    className="notes__textarea">
                </textarea>

                <div className="notes__image">
                    <img
                    src="https://image.freepik.com/foto-gratis/luz-madrugada-sentimiento-solitario_28981-314.jpg" 
                    alt="imagen"
                    />
   
                </div>
        
            </div>

            

        </div>
    )
}
