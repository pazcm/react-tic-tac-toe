// import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard( { onSelectSquare } ) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard)  => {
             // Update the game board with the player's move
            // contains the old array elements as children elements (the previous state) and the nested arrays copied as well
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard
    //     })

    //     onSelectSquare()
    // }
    
    // this board is updated dynamically
    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol className="">
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={(onSelectSquare)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}