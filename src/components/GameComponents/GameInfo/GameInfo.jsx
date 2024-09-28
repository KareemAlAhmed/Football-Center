import React from 'react'
import "./GameInfo.css"
export default function GameInfo({info}) {
  return (
    <section className='Card gameInfo'>
        <header className="cardHeader">
            <div className="cardTitle">
                <p>Game Information</p>
            </div>   
        </header>
        <div className="Wrapper">
            <div className="stadiumAndTime">
                <p>{info?.locationInfo?.stadium}</p>
                <p>{info?.locationInfo?.timeAndDate}</p>
            </div>

            <p className="gameCity">{info?.locationInfo?.city}</p>
        </div>
    </section>
  )
}
