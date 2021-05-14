import React from 'react'

export const JournalEntry = () => {
    return (
        <div className = "journal__entry pointer">
            
            <div 
                className = "journal__entry-picture"
                style={{
                backgroundSize: 'cover',
                backgroundImage: 'url(https://i.pinimg.com/originals/be/80/dd/be80ddb9a5cb1edc6f81c393fcb0b9cc.jpg)'
                }}
            >

            </div>

            <div className="journal__entry-body ">
                <p className="journal__entry-title">
                    Uno nuevo dia
                </p>
                <p className="journal__entry-content">
                Lorem ipsum dolor sit amet
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
