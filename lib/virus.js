class Virus {
  constructor(ctx, board, coords, color){
    this.ctx = ctx;
    this.board = board;
    this.coords = coords;
    this.color = color;
  }

  draw() {
    this.board[this.coords[0]][this.coords[1]] = this.color;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      ((this.coords[1] * 36)), ((this.coords[0] * 36)), 34, 34
    );
  }
}

export default Virus;
