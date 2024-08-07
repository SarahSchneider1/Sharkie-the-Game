class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  UP = false;
  DOWN = false;
  E = false;
  D = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  /**
   * Binds key press events to update the keyboard state.
   */
  bindKeyPressEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowLeft") {
        keyboard.LEFT = true;
      }
      if (e.key == "ArrowUp") {
        keyboard.UP = true;
      }
      if (e.key == "ArrowRight") {
        keyboard.RIGHT = true;
      }
      if (e.key == "ArrowDown") {
        keyboard.DOWN = true;
      }
      if (e.key == " ") {
        keyboard.SPACE = true;
      }
      if (e.key == "e") {
        keyboard.E = true;
      }
      if (e.key == "d") {
        keyboard.D = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowLeft") {
        keyboard.LEFT = false;
      }
      if (e.key == "ArrowUp") {
        keyboard.UP = false;
      }
      if (e.key == "ArrowRight") {
        keyboard.RIGHT = false;
      }
      if (e.key == "ArrowDown") {
        keyboard.DOWN = false;
      }
      if (e.key == " ") {
        keyboard.SPACE = false;
      }
      if (e.key == "e") {
        keyboard.E = false;
      }
      if (e.key == "d") {
        keyboard.D = false;
      }
    });
  }

  /**
   * Binds touch press and release events for on-screen buttons to update the keyboard state.
   * Uses a setTimeout to ensure that the DOM is fully loaded before attaching event listeners.
   */
  bindBtsPressEvents() {
    setTimeout(() => {
      bindButtonTouchEvents("arrow-btn-mid-left", "LEFT", true);
      bindButtonTouchEvents("arrow-btn-mid-left", "LEFT", false);
      bindButtonTouchEvents("arrow-btn-mid-right", "RIGHT", true);
      bindButtonTouchEvents("arrow-btn-mid-right", "RIGHT", false);
      bindButtonTouchEvents("arrow-btn-top", "UP", true);
      bindButtonTouchEvents("arrow-btn-top", "UP", false);
      bindButtonTouchEvents("arrow-btn-bottom", "DOWN", true);
      bindButtonTouchEvents("arrow-btn-bottom", "DOWN", false);
      bindButtonTouchEvents("btn-bubble", "SPACE", true);
      bindButtonTouchEvents("btn-bubble", "SPACE", false);
      bindButtonTouchEvents("btn-slap", "D", true);
      bindButtonTouchEvents("btn-slap", "D", false);
    }, 500);

    /**
     * Binds touch events for a specific button element.
     *
     * @param {string} buttonId - The ID of the button element.
     * @param {string} key - The corresponding keyboard key associated with the button.
     * @param {boolean} isPressed - True if the touchstart event, false if touchend event.
     */
    function bindButtonTouchEvents(buttonId, key, isPressed) {
      const button = document.getElementById(buttonId);
      button.addEventListener(isPressed ? "touchstart" : "touchend", (e) => {
        e.preventDefault();
        keyboard[key] = isPressed;
      });
    }
  }
}
