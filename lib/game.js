import Pill from './pill';

class Game {
  constructor(options) {
  }

  start(ctx) {
    const board = this.newBoard();
    const pill = new Pill(ctx, board);
    pill.draw();
    this.randomizeViruses(ctx, board);
    setInterval(() => {pill.drop();}, 1000);
    console.log(board);
  }

  newBoard() {
    const board = new Array(16);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(8);
    }
    return board;
  }

  randomizeViruses(ctx, board) {
    for (let i = 0; i < 10; i++) {
      let randomX = Math.floor(Math.random() * 8);
      let randomY = Math.floor(Math.random() * 11) + 5;
      while (board[randomY][randomX] !== undefined) {
        randomX = Math.floor(Math.random() * 8);
        randomY = Math.floor(Math.random() * 11) + 5;
      }
      const virusColor = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
      board[randomY][randomX] = virusColor;

      ctx.fillStyle = virusColor;
      ctx.fillRect(
        ((randomX * 36)), ((randomY * 36)), 34, 34
      );
    }
  }


}

Game.DIM_X = 288;
Game.DIM_Y = 576;



export default Game;
