import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard( {onSelectSquare, activePlayerSymbol} ) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleSelectBox(rowIndex, colIndex) {
        setGameBoard((prevGameBoard)  => {
             // Update the game board with the player's move
            // contains the old array elements as children elements (the previous state) and the nested arrays copied as well
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol
            return updatedBoard
        })

        onSelectSquare()
    }
    
    // this board is updated dynamically
    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol className="game-row">
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSelectBox(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}