// here also I lift the state up to the parent component (App.jsx) because the GameBoard component is where the player clicks the buttons to select squares, and the Log component needs to display the history of those selections.
export default function GameBoard( { onSelectSquare, board } ) {
    // this board is a prop that is passed from the App component
    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => (
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