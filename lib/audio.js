class Audio {

  toggleMute() {
    let sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].muted = !sounds[i].muted;
    }
    let muteButton = document.getElementById("muteicon");
    if (sounds[0].muted) {
      muteButton.classList.remove("fa-volume-up");
      muteButton.classList.add("fa-volume-off");
    } else {
      muteButton.classList.remove("fa-volume-off");
      muteButton.classList.add("fa-volume-up");
    }
  }
  startGame() {
    var sound = document.getElementById("bgm");
    sound.play();
  }

  bgmStop() {
    var sound = document.getElementById("bgm");
    sound.pause();
    sound.currentTime = 0;
  }

  toggleAudio() {
    var sound = document.getElementById("bgm");
    sound.pause();
  }

  movePill() {
    var sound = document.getElementById("movepill");
    sound.play();
  }

  rotatePill() {
    var sound = document.getElementById("rotatepill");
    sound.play();
  }

  eatBlocks() {
    var sound = document.getElementById("eatblocks");
    sound.play();
  }

  levelClear() {
    var sound = document.getElementById("levelclear");
    sound.play();
  }

  gameOver() {
    var sound = document.getElementById("gameover");
    sound.play();
  }

}

export default Audio;
