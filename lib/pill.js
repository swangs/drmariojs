class Pill {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.board1 = [0, 3];
    this.board2 = [0, 4];
    // this.pos1 = [126, 18];
    // this.pos2 = [162, 18];
    // this.color1 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
    // this.color2 = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
    this.active = true;
    this.horizontal = true;

    this.pill1 = new PillBlock(ctx, board, [0, 3], ["yellow", "blue", "red"][Math.floor(Math.random() * 3)]);
    this.pill2 = new PillBlock(ctx, board, [0, 4], ["yellow", "blue", "red"][Math.floor(Math.random() * 3)]);
  }

  // draw() {
  //   this.ctx.fillStyle = this.color1;
  //   this.ctx.beginPath();
  //   this.ctx.arc(
  //     this.pos1[0], this.pos1[1], 18, 0, 2 * Math.PI, true
  //   );
  //   this.ctx.fill();
  //
  //   this.ctx.fillStyle = this.color2;
  //   this.ctx.beginPath();
  //   this.ctx.arc(
  //     this.pos2[0], this.pos2[1], 18, 0, 2 * Math.PI, true
  //   );
  //   this.ctx.fill();
  //   this.board[this.board1[0]][this.board1[1]] = this;
  //   this.board[this.board2[0]][this.board2[1]] = this;
  // }

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

        this.board[this.board1[0]][this.board1[1]] = this.pill1;
        this.board[this.board2[0]][this.board2[1]] = this.pill2;

        this.pill1.coords = [this.board1[0], this.board1[1]];
        this.pill2.coords = [this.board2[0], this.board2[1]];
    } else {
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

            this.board1[1] = this.board1[1] + 1;
            this.board2[1] = this.board2[1] + 1;

            this.board[this.board1[0]][this.board1[1]] = this.pill1;
            this.board[this.board2[0]][this.board2[1]] = this.pill2;

            this.pill1.coords = [this.board1[0], this.board1[1]];
            this.pill2.coords = [this.board2[0], this.board2[1]];
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

              this.board1[1] = this.board1[1] - 1;
              this.board2[1] = this.board2[1] - 1;

              this.board[this.board1[0]][this.board1[1]] = this.pill1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;

              this.pill1.coords = [this.board1[0], this.board1[1]];
              this.pill2.coords = [this.board2[0], this.board2[1]];
            }
          }
        if (k === "z") {
          if (this.horizontal) {
            if (this.board2[0] > 0 && this.board[this.board1[0] - 1][this.board1[1]] === undefined) {

              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] - 1;
              this.board2[1] = this.board2[1] - 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              this.horizontal = false;
            }
          } else {
            if (this.board[this.board1[0]][this.board1[1] + 1] === undefined && this.board1[1] < 7) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] + 1;
              this.board2[1] = this.board2[1] + 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              const tempColor = this.pill1.color;
              this.pill1.color = this.pill2.color;
              this.pill2.color = tempColor;

              this.horizontal = true;
            }
          }
        }
        if (k === "x") {
          if (this.horizontal) {
            if (this.board2[0] > 0 && this.board[this.board1[0] - 1][this.board1[1]] === undefined) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] - 1;
              this.board2[1] = this.board2[1] - 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              const tempColor = this.pill1.color;
              this.pill1.color = this.pill2.color;
              this.pill2.color = tempColor;

              this.horizontal = false;
            }
          } else {
            if (this.board[this.board1[0]][this.board1[1] + 1] === undefined && this.board1[1] < 7) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] + 1;
              this.board2[1] = this.board2[1] + 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              this.horizontal = true;
            }
          }
        }
    }

  }
}

class PillBlock {
  constructor(ctx, board, coords, color){
    this.ctx = ctx;
    this.board = board;
    this.coords = coords;
    this.color = color;
    this.type = "pill";
  }

  draw() {
    let img = new Image();
    img.src = `images/pill${this.color}.png`;
    this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
    img.onload = () => {
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
    };
  }

  drop() {
    if (
      this.coords[0] < 15 &&
      this.board[this.coords[0] + 1][this.coords[1]] === undefined
    ) {
        this.board[this.coords[0]][this.coords[1]] = undefined;
        this.coords[0] = this.coords[0] + 1;
        this.board[this.coords[0]][this.coords[1]] = this;
    }
  }
}


export default Pill;
