import { useState } from 'react'

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false)
    function handleEditClick() {
        setIsEditing(!isEditing)
    }

    let playerName = <span className='player-name'>{name}</span>
    let btnCaption = 'Edit'

    if (isEditing) {
        playerName = <input type="text" required defaultValue={name}/>
        btnCaption = 'Save'
    }

  return (
    <li className="player">
        {playerName}
        <span className="player">
            {/* <span className="player-name">{name}</span> see playerName var*/}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}