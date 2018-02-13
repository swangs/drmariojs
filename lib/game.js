import Pill from './pill';
import Virus from './virus';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.speed = 500;
    this.gameOver = false;
    this.pausing = false;
    this.currentPill = null;
    this.pills = [];
    this.viruses = [];
    this.board = this.newBoard(ctx);
  }

  newBoard(ctx) {
    const board = new Array(16);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(8);
    }
    this.randomizeViruses(ctx, board);
    return board;
  }

  randomizeViruses(ctx, board) {
    for (let i = 0; i < 10; i++) {
      let randomX = Math.floor(Math.random() * 8);
      let randomY = Math.floor(Math.random() * 12) + 4;
      while (board[randomY][randomX] !== undefined) {
        randomX = Math.floor(Math.random() * 8);
        randomY = Math.floor(Math.random() * 12) + 4;
      }
      const virusColor = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];

      const virus = new Virus(ctx, board, [randomY, randomX], virusColor);
      this.viruses.push(virus);
    }
  }

  newPill(ctx, board) {
    if (this.board[0][3] !== undefined || this.board[0][4] !== undefined) {
      this.gameOver = true;
    }
    const pill = new Pill(ctx, board);
    this.currentPill = pill;
    this.pills.push(pill);
  }

  allObjects() {
    return [].concat(this.pills, this.viruses);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw();
    });
  }

  bindKeyHandlers() {
    Object.keys(Game.MOVES).forEach((k) => {
      const move = Game.MOVES[k];
      key(k, () => { this.currentPill.move(k); this.draw(this.ctx); });
    });
    key("space", () => { this.pause(); });
  }

  pause() {
    this.pausing = !this.pausing;
    this.currentPill.active = !this.currentPill.active;
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = "red";
    this.ctx.font = "60px Arial";
    this.ctx.fillText("PAUSED",25,300);
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if (this.pausing) {
      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    } else if (this.gameOver) {
      alert("Game Over");
    } else {
      const timeDelta = time - this.lastTime;

      if (this.pills[0] === undefined || !this.currentPill.active) {
        this.newPill(this.ctx, this.board);
      } else {
        this.currentPill.drop();
      }

      this.draw(this.ctx);
      this.lastTime = time;

      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    }
  }


}

Game.DIM_X = 288;
Game.DIM_Y = 576;
Game.MOVES = {
  left: "left",
  right: "right",
  down: "down",
  z: "z",
  x: "x",
};



export default Game;
