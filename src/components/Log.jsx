// again we need to lift the state up to the parent component
// because the information about which button was clicked is generated in the GameBoard component
// and the App component is where we have access to both the GameBoard and Log components.

export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn) => (
                /* always use the key prop when rendering dynamic lists */
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>
            ))}
        </ol>
    )
}







