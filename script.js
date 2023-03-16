// 定义棋盘的行数和列数
const numRows = 6;
const numCols = 7;

// 初始化一个空的棋盘
const board = Array.from({ length: numRows }, () => Array(numCols).fill(null));

// 设置当前玩家为 1
let currentPlayer = 1;

// 创建游戏棋盘
function createGameBoard() {
  const table = document.querySelector("table");
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("td");
      cell.dataset.row = i;
      cell.dataset.col = j;

      // 为每个单元格添加点击事件
      cell.addEventListener("click", handleCellClick);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// 处理单元格点击事件
function handleCellClick(event) {
  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // 如果不是合法的落子位置，不做任何操作
  if (!isValidMove(row, col)) {
    return;
  }

  // 将棋子放在合适的位置，并获取新的行数
  const newRow = placePiece(row, col);

  // 为单元格添加对应玩家的样式
  cell.classList.add(`player${currentPlayer}`);
  cell.dataset.row = newRow;

  // 检查是否获胜
  if (checkWin(newRow, col)) {
    alert(`玩家 ${currentPlayer} 胜利！`);
    location.reload();
  } else {
    // 切换玩家
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

// 检查是否为合法的落子位置
function isValidMove(row, col) {
  // 检查当前列是否已满
  if (board[0][col] !== null) {
    return false;
  }

  // 检查点击的位置是否是当前列中第一个空位置
  return row === getFirstEmptyRowInColumn(col);
}

// 查找当前列中第一个空位置的行号
function getFirstEmptyRowInColumn(col) {
  for (let row = numRows - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1;
}

// 放置棋子并返回新的行数
function placePiece(row, col) {
  while (row >= 0 && board[row][col] === null) {
    row--;
  }
  board[row + 1][col] = currentPlayer;
  return row + 1;
}

// 检查是否获胜
function checkWin(row, col) {
  // 检查水平、垂直和对角线方向
  return (
    checkDirection(row, col, 0, 1) ||
    checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 1, 1) ||
    checkDirection(row, col, 1, -1)
  );
}

// 检查指定方向是否形成四子连线
function checkDirection(row, col, rowDelta, colDelta) {
  let count = 1;
  for (let i = 1; i < 4; i++) {
    const newRow = row + rowDelta * i;
    const newCol = col + colDelta * i;
    if (
      newRow >= 0 &&
      newRow < numRows &&
      newCol >= 0 &&
      newCol < numCols &&
      board[newRow][newCol] === currentPlayer
    ) {
      count++;
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i++) {
    const newRow = row - rowDelta * i;
    const newCol = col - colDelta * i;
    if (
      newRow >= 0 &&
      newRow < numRows &&
      newCol >= 0 &&
      newCol < numCols &&
      board[newRow][newCol] === currentPlayer
    ) {
      count++;
    } else {
      break;
    }
  }

  // 如果连续的棋子数量达到 4，返回 true 表示获胜
  return count >= 4;
}
// 调用 createGameBoard 函数创建棋盘
createGameBoard();
