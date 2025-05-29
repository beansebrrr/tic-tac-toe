/**
 * TIC TAC TOE
 */

function Game(selector, player1, player2) {
  const gameContainer = document.querySelector(selector)
  let currentPlayer

  let boardArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]

  const btnRestart = gameContainer.querySelector("#btn-restart")
  const boardElement = gameContainer.querySelector("#board")
  const messageElement = gameContainer.querySelector("#message")

  this.start = () => {
    updateBoard(true)
    switchPlayers(true)
    showResult()
  }

  const updateBoard = (clear = false) => {
    // Check for a winner
    boardElement.replaceChildren()
    // Update all the board's cells
    for (let row in boardArr) {
    for (let col in boardArr[row]) {
      if (clear)
        boardArr[row][col] = ""

      const Cell = createCell(boardArr[row][col], col, row)
      boardElement.appendChild(Cell)
    }}
  }
  
  const showResult = () => {
    // Update the messageScreen
    if (checkWinner() === "tie") messageElement.textContent = checkWinner()
    else if (checkWinner()) messageElement.textContent = `${checkWinner()} wins`
    else messageElement.textContent = `${currentPlayer.name}'s turn`
  }

  const playTurn = (plyr, posX, posY) => {
    const symbol = plyr.symbol

    if (!posX) posX = prompt(`${plyr.name} posX`)
    if (!posY) posY = prompt(`${plyr.name} posY`)

    if (fillCell(posY, posX, symbol) != 1)
      switchPlayers()
  }

  const fillCell = (col, row, symbol) => {
    if (!boardArr[col][row])
      boardArr[col][row] = symbol
    else return 1
  }

  const checkWinner = () => {
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

    if (winSymbol) return [player1, player2].filter(player => player.symbol === winSymbol)[0].name
    else if (boardIsFull) return "tie"
    else return ""
  }

  const switchPlayers = (reset=false) => {
    if (!currentPlayer || reset) currentPlayer = player1
    else if (currentPlayer === player1) currentPlayer = player2
    else if (currentPlayer === player2) currentPlayer = player1
  }

  const createCell = (content="", arrayCoordinateCol, arrayCoordinateRow) => {
    const cell = document.createElement("button")
    cell.classList.add("cell")
    cell.textContent = content
    if (content) cell.classList.add(content)

    if (!checkWinner()) 
      cell.addEventListener("click", () => {
        playTurn(currentPlayer, arrayCoordinateCol, arrayCoordinateRow)
        updateBoard()
        showResult()
      })

    return cell
  }

  btnRestart.addEventListener("click", this.start)
}

function Player(name, symbol) {
  this.name = name
  this.symbol = symbol
}

const player1 = new Player("Player one", "x")
const player2 = new Player("Player two", "o")

const game = new Game("main", player1, player2)

game.start()