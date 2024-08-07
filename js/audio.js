let swim_sound = new Audio("audio/swim.mp3");
let bubble_sound = new Audio("audio/bubbles.mp3");
let slap_sound = new Audio("audio/slap.mp3");
let jellyfishBubble_sound = new Audio("audio/jellyFishBubble.mp3");
let coinCollect_sound = new Audio("audio/coinCollect.mp3");
let poisonCollect_sound = new Audio("audio/poisonCollect.mp3");
let lose_sound = new Audio("audio/lose.mp3");
let win_sound = new Audio("audio/win.mp3");
let hurt_sound = new Audio("audio/hurt.mp3");
let background_sound = new Audio("audio/backgroundAudio.mp3");
let endboss_sound = new Audio("audio/endboss.mp3");

let mute = false;
let background_audio = true;

/**
 * Toggles the game audio on or off.
 */
function toggleAudio() {
  const volumeImg = document.getElementById("volume");
  mute = !mute;
  if (mute) {
    swim_sound.volume = 0;
    volumeImg.src = "img/buttons/mute.png";
  } else {
    swim_sound.volume = 0.03;
    volumeImg.src = "img/buttons/volume.png";
  }
}

/**
 * Unmutes all game audio.
 */
function unmuteAllAudio() {
  background_audio = true;
  mute = false;
  swim_sound.volume = 0.02;
  slap_sound.volume = 0.05;
  jellyfishBubble_sound.volume = 0.02;
  coinCollect_sound.volume = 0.01;
  poisonCollect_sound.volume = 0.02;
  lose_sound.volume = 0.02;
  win_sound.volume = 0.02;
  hurt_sound.volume = 0.02;
  background_sound.volume = 0.02;
  endboss_sound.volume = 0.02;
}

/**
 * Mutes all game audio.
 */
function muteAllAudio() {
  background_audio = false;
  mute = true;
  lose_sound.volume = 0;
  swim_sound.volume = 0;
  slap_sound.volume = 0;
  jellyfishBubble_sound.volume = 0;
  coinCollect_sound.volume = 0;
  poisonCollect_sound.volume = 0;
  win_sound.volume = 0;
  hurt_sound.volume = 0;
  background_sound.volume = 0;
  endboss_sound.volume = 0;
}

/**
 * Manages background audio playback with looping and mute functionality.
 */
function backgroundAudio() {
  background_sound.loop = true;
  if (mute) {
    background_sound.pause();
  } else {
    if (background_sound.paused && background_audio) {
      background_sound.play();
    }
  }
  setTimeout(backgroundAudio, 100);
}

/**
 * Manages endboss audio playback with looping and mute functionality.
 */
function endbossAudio() {
  backgroundAudioStop();
  endboss_sound.loop = true;
  if (mute) {
    endboss_sound.pause();
  } else {
    if (endboss_sound.paused) {
      endboss_sound.play();
    }
  }
  setTimeout(endbossAudio, 100);
}

/**
 * Stops endboss audio playback.
 */
function endbossAudioStop() {
  endboss_sound.pause();
}

/**
 * Stops background audio playback and resets state.
 */
function backgroundAudioStop() {
  background_audio = false;
  background_sound.loop = false;
  background_sound.pause();
}

/**
 * Plays the lose sound effect and stops background and endboss audio.
 */
function loseAudio() {
  backgroundAudioStop();
  endbossAudioStop();
  lose_sound.play();
}

/**
 * Plays the hurt sound effect if audio is not muted.
 */
function hurtAudio() {
  if (!mute) {
    hurt_sound.play();
  }
}

/**
 * Plays the win sound effect and stops background and endboss audio.
 */
function winAudio() {
  backgroundAudioStop();
  endbossAudioStop();
  win_sound.play();
}

/**
 * Plays the coin collect sound effect if audio is not muted.
 */
function collectCoinAudio() {
  if (!mute) {
    coinCollect_sound.play();
  }
}

/**
 * Plays the poison collect sound effect if audio is not muted.
 */
function collectPoisonAudio() {
  if (!mute) {
    poisonCollect_sound.play();
  }
}

/**
 * Plays the sharkie swim sound effect.
 */
function sharkieSwimAudio() {
  swim_sound.play();
}

/**
 * Pauses the sharkie swim sound effect.
 */
function sharkieSwimAudioPause() {
  swim_sound.pause();
}

/**
 * Plays the bubble sound effect.
 */
function bubbleAudio() {
  bubble_sound.play();
}

/**
 * Plays the sharkie slap sound effect.
 */
function sharkieSlap() {
  slap_sound.play();
}

/**
 * Plays the jellyfish bubble sound effect if audio is not muted.
 */
function jellyFishBubble() {
  if (!mute) {
    jellyfishBubble_sound.play();
  }
}
