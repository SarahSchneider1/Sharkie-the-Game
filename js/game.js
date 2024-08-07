let canvas;
let world;
let keyboard = new Keyboard();
let gameIsStarted = false;
let movableObject = new MovableObject();
let isFullscreen = false;
let portraitModus;

/**
 * initial function when page loads
 */
function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  checkPortraitModus();
  checkPortraitEvent();
  muteAllAudio();
}

/**
 * Initializes the game world.
 */
function initWorld() {
  world = new World(canvas, keyboard);
  gameIsStarted = true;
  unmuteAllAudio();
  backgroundAudio();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * starting the game
 */
function startGame() {
  const startScreen = document.getElementById("startScreen");
  const volumeImg = document.getElementById("volume");
  volumeImg.src = "img/buttons/volume.png";
  startScreen.classList.add("d-none");
  initWorld();
}

/**
 * Displays the end screen and sets the specified image to visible.
 *
 * @param {string} imgVar - The ID of the image element (won or game over)..
 */
function endGameScreen(imgVar) {
  let endScreen = document.getElementById("endScreen");
  let img = document.getElementById(imgVar);
  endScreen.classList.remove("v-none");
  img.classList.remove("d-none");
}

/**
 * Restarts the game by hiding the end screen and resetting game elements.
 */
function restart() {
  let endScreen = document.getElementById("endScreen");
  let youWin = document.getElementById("youWin");
  let gameOver = document.getElementById("gameOver");
  endScreen.classList.add("v-none");
  gameOver.classList.add("d-none");
  youWin.classList.add("d-none");
  initLevel();
  initWorld();
}

/**
 * Hides the "How to Play" screen.
 */
function backToMenuFromHowToPlay() {
  let howToPlay = document.getElementById("howToPlayScreen");
  howToPlay.classList.add("v-none");
}

/**
 * Show the "How to Play" screen.
 */
function showHowToPlay() {
  let howToPlay = document.getElementById("howToPlayScreen");
  howToPlay.classList.remove("v-none");
}

/**
 * Toggles the visibility of the sidebar menu.
 */
function toggleMenu() {
  document.getElementById("sidebarMenu").classList.toggle("slideIn");
}

/**
 * Sets the canvas size to fullscreen dimensions.
 */
function setCanvasSizeFullscreen() {
  let canvas = document.getElementById("canvas");
  canvas.style.width = "80%";
  canvas.style.height = "100%";
}

/**
 * Sets the canvas size to normal screen dimensions.
 */
function setCanvasSizeNormalscreen() {
  let canvas = document.getElementById("canvas");
  canvas.style.width = "720px";
  canvas.style.height = "480px";
}

/**
 * Toggles between fullscreen and normal screen modes.
 */
function toggleFullscreen() {
  const fullscreenImg = document.getElementById("fullscreen");
  if (!isFullscreen) {
    enterFullscreen();
    fullscreenImg.src = "img/buttons/fullscreenExit.png";
  } else {
    exitFullscreen();
    fullscreenImg.src = "img/buttons/fullscreen.png";
  }
  isFullscreen = !isFullscreen;
}

/**
 * Enters fullscreen mode and adjusts canvas size accordingly.
 */
function enterFullscreen() {
  let screen = document.getElementById("screen");
  if (screen.requestFullscreen) {
    screen.requestFullscreen();
  } else if (screen.msRequestFullscreen) {
    screen.msRequestFullscreen();
  } else if (screen.webkitRequestFullscreen) {
    screen.webkitRequestFullscreen();
  }
  setCanvasSizeFullscreen();
}

/**
 * Exits fullscreen mode and adjusts canvas size accordingly.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  setCanvasSizeNormalscreen();
}

/**
 * Event listener for fullscreen change, adjusts canvas size if exiting fullscreen
 */
document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    setCanvasSizeNormalscreen();
  }
});

/**
 * checking if device is in portrait mode when mode changed (event)
 */
function checkPortraitEvent() {
  const mediaQuery = window.matchMedia("(orientation: portrait)");
  const handleChange = (e) => {
    let portrait = e.matches;
    if (!portrait) {
      portraitModus = false;
      hidePortraitScreen();
    } else {
      portraitModus = true;
      showPortraitScreen();
    }
  };
  mediaQuery.removeEventListener("change", handleChange);
  mediaQuery.addEventListener("change", handleChange);
}

/**
 * checking if device is in portait mode when page loads
 */
function checkPortraitModus() {
  portraitModus = window.matchMedia("(orientation: portrait)").matches;
  if (!portraitModus) {
    hidePortraitScreen();
  } else {
    showPortraitScreen();
  }
}

/**
 * showing portrait mode screen
 */
function showPortraitScreen() {
  document.getElementById("portraitImage").classList.remove("v-none");
  document.getElementById("portraitScreen").classList.remove("v-none");
  spinPortraitImage();
}

/**
 * hiding portrait mode screen
 */
function hidePortraitScreen() {
  let portraitImageElement = document.getElementById("portraitImage");
  document.getElementById("portraitScreen").classList.add("v-none");
  portraitImageElement.style.transition = "all 0ms ease-in-out";
  portraitImageElement.style.transform = "none";
  portraitImageElement.style.transition = "";
}

/**
 * rotating the image in portrait screen
 */
function spinPortraitImage() {
  setTimeout(() => {
    document.getElementById("portraitImage").style.transform = "rotate(90deg)";
  }, 500);
}