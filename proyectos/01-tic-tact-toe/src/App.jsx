import { useState } from 'react'
import './App.css'

import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    // Comprobamos si hay un tablero guardado en el localStorage
    // si lo hay lo devolvemos, en caso contrario un tablero vacio
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    // Comprobamos si hay un turno guardado en el localStorage
    const turnFromStorage = window.localStorage.getItem('turn ')
    // Si hay un turno guardado o devolvemos, en caso contrario X
    return turnFromStorage ?? TURNS.X
  })

  // null = no hay ganador, false = no hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    // Borrar aqui la partida del localStorage
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // No actualizamos esta posición
    // si ya tiene algo
    if (board[index] !== null || winner) return
    // Actualizamos el tablero
    const newBoard = structuredClone(board)
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar aqui la partida en el localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn })
    // Comprobamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={() => updateBoard(index)}
            >
              {square}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
