class Pill {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.boardX = [3, 4];
    this.boardY = 0;
    this.pos = [126, 162, 18];
    this.color1 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
    this.color2 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
  }

  draw() {
    this.ctx.fillStyle = this.color1;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos[0], this.pos[2], 18, 0, 2 * Math.PI, true
    );
    this.ctx.fill();

    this.ctx.fillStyle = this.color2;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos[1], this.pos[2], 18, 0, 2 * Math.PI, true
    );
    this.ctx.fill();
    this.board[this.boardY][this.boardX[0]] = this.color1;
    this.board[this.boardY][this.boardX[1]] = this.color2;
  }

  drop() {
    if (
      this.board[this.boardY + 1][this.boardX[0]] === undefined &&
      this.board[this.boardY + 1][this.boardX[1]] === undefined) {

        this.ctx.clearRect(this.pos[0] - 18, this.pos[2] - 18, 36, 36);
        this.ctx.clearRect(this.pos[1] - 18, this.pos[2] - 18, 36, 36);
        this.board[this.boardY][this.boardX[0]] = undefined;
        this.board[this.boardY][this.boardX[1]] = undefined;

        this.boardY = this.boardY + 1;
        this.pos[2] = this.pos[2] + 36;

        this.draw();
    }
  }

  

}

export default Pill;
