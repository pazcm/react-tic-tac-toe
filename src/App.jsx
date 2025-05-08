import { useState } from "react"

import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx"
import GameOver from "./components/GameOver.jsx"
import { WINNING_COMBINATIONS } from "./winning-combinations.js"
import { use } from "react"


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
  const [players, setPlayers]= useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns)

  // copy inner arrays so make sure we add a brand new array and not the original gameboard (initial array in memory)
  let gameBoard = [...initialGameBoard.map(array => [...array])]

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
      winner = players[firstSquareSymbol]
      break
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner


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

  function handleRestart() {
    setGameTurns([])
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }
  
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handleNameChange} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handleNameChange} />
      </ol>
      {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart} />)}
      {/* set a board prop which gets this gameboard that I'm deriving here now */}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App
