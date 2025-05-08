/**
 * TIC TAC TOE
 */

function Game(container, player1, player2) {
  let currentPlayer

  let boardArr = [
    ["", "x", ""],
    ["", "o", ""],
    ["", "o", ""],
  ]
  const boardElement = document.querySelector(container)

  this.start = () => {
    updateBoard(true)
    switchPlayers()
  }

  const updateBoard = (clear = false) => {
    boardElement.replaceChildren()
    for (let row in boardArr) {
    for (let col in boardArr[row]) {
      if (clear) {
        boardArr[row][col] = ""
      }
      const Cell = createCell(boardArr[row][col], col, row)
      boardElement.appendChild(Cell)
    }
    }
  }

  this.playTurn = (plyr, posX, posY) => {
    const symbol = plyr.symbol

    if (!posX) posX = prompt(`${plyr.name} posX`)
    if (!posY) posY = prompt(`${plyr.name} posY`)

    fillCell(posY, posX, symbol)
    for (let row of boardArr) console.log(row)
    console.log(this.checkWinner())
    switchPlayers()
  }

  const fillCell = (col, row, symbol) => {
    if (!boardArr[col][row])
      boardArr[col][row] = symbol
    else return 1
  }

  this.checkWinner = () => {
    let winSymbol
    let boardIsFull = true

    const sameThreeSymbols = (x, y, z) =>
      x && y && z && (x === y && x === z && y === z)

    /* Horizontals */
    for (let row of boardArr) {
      if (sameThreeSymbols(...row)) winSymbol = row[0]

      for (let cell of row)
        if (!cell) boardIsFull = false
    }

    /* Verticals */
    for (let i = 0; i < 3; i++) {
      if (sameThreeSymbols(
        boardArr[0][i],
        boardArr[1][i],
        boardArr[2][i]
      )) winSymbol = boardArr[0][i]
    }

    /* Diagonals */
    if (sameThreeSymbols(
      boardArr[0][2],
      boardArr[1][1],
      boardArr[2][0]
    ) || sameThreeSymbols(
      boardArr[0][0],
      boardArr[1][1],
      boardArr[2][2]
    )) winSymbol = boardArr[1][1]

    if (winSymbol) return winSymbol
    else if (boardIsFull) return "tie"
    else return ""
  }

  const switchPlayers = () => {
    if (!currentPlayer) currentPlayer = player1
    else if (currentPlayer === player1) currentPlayer = player2
    else if (currentPlayer === player2) currentPlayer = player1
  }

  const createCell = (content="", arrayCoordinateCol, arrayCoordinateRow) => {
    const cell = document.createElement("button")
    cell.classList.add("cell")
    cell.textContent = content

    cell.addEventListener("click", () => {
      this.playTurn(currentPlayer, arrayCoordinateCol, arrayCoordinateRow)
      updateBoard()
    })

    return cell
  } 
}

class Player {
  constructor(name, symbol) {
    this.name = name
    this.symbol = symbol
  }
}

const matchu = new Player("Matchu", "x")
const sel = new Player("Sel", "o")

const game = new Game(".board",matchu, sel)

game.start()