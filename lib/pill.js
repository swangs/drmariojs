class Pill {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.board1 = [0, 3];
    this.board2 = [0, 4];
    this.pos1 = [126, 18];
    this.pos2 = [162, 18];
    this.color1 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
    this.color2 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
    this.active = true;
    this.horizontal = true;
  }

  draw() {
    this.ctx.fillStyle = this.color1;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos1[0], this.pos1[1], 18, 0, 2 * Math.PI, true
    );
    this.ctx.fill();

    this.ctx.fillStyle = this.color2;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos2[0], this.pos2[1], 18, 0, 2 * Math.PI, true
    );
    this.ctx.fill();
    this.board[this.board1[0]][this.board1[1]] = this.color1;
    this.board[this.board2[0]][this.board2[1]] = this.color2;
  }

  drop() {
    if (
      this.board1[0] < 15 &&
      this.board2[0] < 15 &&
      (this.board[this.board1[0] + 1][this.board1[1]] === undefined || this.board1[0] + 1 === this.board2[0] ) &&
      (this.board[this.board2[0] + 1][this.board2[1]] === undefined || this.board2[0] + 1=== this.board1[0] )
    ) {

        this.board[this.board1[0]][this.board1[1]] = undefined;
        this.board[this.board2[0]][this.board2[1]] = undefined;

        this.board1[0] = this.board1[0] + 1;
        this.board2[0] = this.board2[0] + 1;
        this.pos1[1] = this.pos1[1] + 36;
        this.pos2[1] = this.pos2[1] + 36;

    } else {
      this.active = false;
    }
    if (this.boardY === 15) {
      this.active = false;
    }
  }

  move(k) {
    if (this.active) {
      if (k === "down") {
        this.drop();
      }
      if (k === "right") {
        if (
          this.board1[1] < 7 &&
          this.board2[1] < 7 &&
          (this.board[this.board1[0]][this.board1[1] + 1] === undefined || this.board1[1] + 1 == this.board2[1]) &&
          (this.board[this.board2[0]][this.board2[1] + 1] === undefined || this.board2[1] + 1 == this.board1[1])
          ) {
            this.board[this.board1[0]][this.board1[1]] = undefined;
            this.board[this.board2[0]][this.board2[1]] = undefined;
            this.board1 = [this.board1[0], this.board1[1] + 1];
            this.board2 = [this.board2[0], this.board2[1] + 1];

            this.pos1 = [this.pos1[0] + 36, this.pos1[1]];
            this.pos2 = [this.pos2[0] + 36, this.pos2[1]];
          }
        }
        if (k === "left") {
          if (
            this.board1[1] > 0 &&
            this.board2[1] > 0 &&
            (this.board[this.board1[0]][this.board1[1] - 1] === undefined || this.board1[1] - 1 == this.board2[1]) &&
            (this.board[this.board2[0]][this.board2[1] - 1] === undefined || this.board2[1] - 1 == this.board1[1])
            ) {
              this.board[this.board1[0]][this.board1[1]] = undefined;
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board1 = [this.board1[0], this.board1[1] - 1];
              this.board2 = [this.board2[0], this.board2[1] - 1];

              this.pos1 = [this.pos1[0] - 36, this.pos1[1]];
              this.pos2 = [this.pos2[0] - 36, this.pos2[1]];
            }
          }
    }

  }



}

export default Pill;
