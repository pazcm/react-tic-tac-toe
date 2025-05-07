// import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard( { onSelectSquare, turns } ) {
    // transform turns array in a multidimensional array (like the game board)
    let gameBoard = initialGameBoard;
    // override the initial game board with the turns array (if it is not empty, has turns)
   
    // deriving the gameboard from that state
   for (const turn of turns) {
        const { square, player } = turn
        const { row, col } = square 
        // console.log(turn)
        gameBoard[row][col] = player
    }
    // console.log(gameBoard)
    // gameBoard is a computed value, so we don't need to store it in a state (is dereived from the gameTurns state)
    

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
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}