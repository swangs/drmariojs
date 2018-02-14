class Virus {
  constructor(ctx, board, coords, color){
    this.ctx = ctx;
    this.board = board;
    this.coords = coords;
    this.color = color;
    this.type = "virus";
  }

  draw() {
    this.board[this.coords[0]][this.coords[1]] = this;

    let img = new Image();
    img.src = `images/virus${this.color}.png`;
    this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 34, 34);
    img.onload = () => {
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 34, 34);
    };

    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(
    //   ((this.coords[1] * 36)), ((this.coords[0] * 36)), 34, 34
    // );
  }
}

export default Virus;
