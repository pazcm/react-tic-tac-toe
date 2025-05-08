import { useState } from "react"

import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "./winning-combinations.js"


function deriveActivePlayer(gameTurns) {
  // Check if there are any turns
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]


function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = initialGameBoard

  // here deriving the gameboard from gameTurns state
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square 
    
    gameBoard[row][col] = player
  }

  let winner
  // extract the symbols and positions from the gameboard
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol
      break
    }
  }


  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      
      const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]
      // Log the current player and the selected square
      // console.log(`Player ${currentPlayer} selected square ${rowIndex},${colIndex}`)
      // Log the updated game turns
      return updatedTurns
    })
  }
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      {winner && <div className="winner"> {winner} wins!</div>}
      {/* set a board prop which gets this gameboard that I'm deriving here now */}
      <GameBoard onSelectSquare={handleSelectSquare}
      board={gameBoard}
      />
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App
