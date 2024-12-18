import { WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] && // a tiene algo
      boardToCheck[a] === boardToCheck[b] && // a es igual a b
      boardToCheck[a] === boardToCheck[c] // a es igual a c
    ) {
      return boardToCheck[a]
    }
  }
}

export const checkEndGame = (newBoard) => {
  // Comprobamos si hay empate
  // si no hay más casillas vacías
  // en el tablero
  // devuelve true
  return newBoard.every((square) => square !== null)
}
