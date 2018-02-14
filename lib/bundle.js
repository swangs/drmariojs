/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;
  const ctx = canvasEl.getContext("2d");

  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pill__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__virus__ = __webpack_require__(3);



class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.speed = 500;
    this.difficulty = 10;
    this.gameOver = false;
    this.pausing = false;
    this.checking = false;
    this.currentPill = null;
    this.virusCount = 0;
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
    for (let i = 0; i < 50; i++) {
      let randomX = Math.floor(Math.random() * 8);
      let randomY = Math.floor(Math.random() * 12) + 4;
      while (board[randomY][randomX] !== undefined) {
        randomX = Math.floor(Math.random() * 8);
        randomY = Math.floor(Math.random() * 12) + 4;
      }
      const virusColor = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
      const virus = new __WEBPACK_IMPORTED_MODULE_1__virus__["a" /* default */](ctx, board, [randomY, randomX], virusColor);
      board[randomY][randomX] = virus;
    }
  }

  newPill(ctx, board) {
    if (this.board[0][3] !== undefined || this.board[0][4] !== undefined) {
      this.gameOver = true;
    }
    const pill = new __WEBPACK_IMPORTED_MODULE_0__pill__["a" /* default */](ctx, board);
    this.currentPill = pill;
    board[0][3] = pill.pill1;
    board[0][4] = pill.pill2;
  }

  allObjects() {
    return [].concat.apply([], this.board);
  }

  draw(ctx) {
    if (!this.pausing) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach((object) => {
        if (object !== undefined) {
          object.draw();
        }
      });
      document.getElementById("virus").innerHTML = `Viruses Left: ${this.virusCount}`;
    }
  }

  bindKeyHandlers() {
    Object.keys(Game.MOVES).forEach((k) => {
      const move = Game.MOVES[k];
      key(k, () => {
        this.currentPill.move(k);
        this.draw(this.ctx);
        if (!this.currentPill.active) {
          this.checkBoard();
        }
      });
    });
    key("space", () => { this.pause(); });
  }

  pause() {
    this.pausing = !this.pausing;
    this.currentPill.active = !this.currentPill.active;
    this.ctx.font = "60px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("PAUSED",25,300);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText("PAUSED",25,300);
  }

  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
    this.checkBoard();
  }

  animate(time) {
    if (this.pausing) {
      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    } else if (this.gameOver) {
      alert("Game Over");
    } else {
      if (!this.currentPill || !this.currentPill.active) {
        this.newPill(this.ctx, this.board);
      } else {
        this.currentPill.drop();
        if (!this.currentPill.active) {
          this.checkBoard();
        }
      }

      this.draw(this.ctx);

      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    }
  }

  checkBoard() {
    this.checkCols();
    this.checkRows();
  }

  checkRows() {
    let viruses = [];
    let tempRow;
    let currentColor;
    for (var i = 0; i < this.board.length; i++) {
      tempRow = [];
      currentColor = null;
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] !== undefined) {
          if (this.board[i][j].type === "virus") {
            viruses.push([i, j]);
          }
          if (currentColor === null) {
            currentColor = this.board[i][j].color;
          }
          if (this.board[i][j].color === currentColor) {
            tempRow.push([i, j]);
          }
          if (this.board[i][j].color !== currentColor || j === 7) {
            currentColor = this.board[i][j].color;
            if (tempRow.length > 3) {
              tempRow.forEach((coord) => {
                this.board[coord[0]][coord[1]] = undefined;
              });
            }
            tempRow = [];
            tempRow.push([i, j]);
          }
        } else {
          if (tempRow.length > 3) {
            tempRow.forEach((coord) => {
              this.board[coord[0]][coord[1]] = undefined;
            });
          }
          tempRow = [];
          currentColor = null;
        }
      }
    }
    this.virusCount = viruses.length;
  }

  checkCols() {
    const transposedBoard = [];
    for (var i = 0; i < 8; i++) {
      const newRow = [];
      for (var j = 0; j < this.board.length; j++) {
        newRow.push(this.board[j][i]);
      }
      transposedBoard.push(newRow);
    }
    let tempCol = [];
    let currentColor = null;
    for (i = 0; i < transposedBoard.length; i++) {
      tempCol = [];
      currentColor = null;
      for (j = 0; j < transposedBoard[i].length; j++) {
        if (transposedBoard[i][j] !== undefined) {
          if (currentColor === null) {
            currentColor = transposedBoard[i][j].color;
          }
          if (transposedBoard[i][j].color === currentColor) {
            tempCol.push([i, j]);
          }
          if (transposedBoard[i][j].color !== currentColor || j === 15) {
            currentColor = transposedBoard[i][j].color;
            if (tempCol.length > 3) {
              tempCol.forEach((coord) => {
                this.board[coord[1]][coord[0]] = undefined;
              });
            }
            tempCol = [];
            tempCol.push([i, j]);
          }
        } else {
          if (tempCol.length > 3) {
            tempCol.forEach((coord) => {
              this.board[coord[1]][coord[0]] = undefined;
            });
          }
          tempCol = [];
          currentColor = null;
        }
      }
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/* harmony default export */ __webpack_exports__["a"] = (Pill);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 36, 36);
    img.onload = () => {
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 36, 36);
    };

    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(
    //   ((this.coords[1] * 36)), ((this.coords[0] * 36)), 34, 34
    // );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Virus);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map