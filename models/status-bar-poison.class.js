class StatusbarPoison extends DrawableObjects {
  IMAGES_STATUSBAR_POISON = [
    "img/collectable/statusbar/poisonStatus100.png",
    "img/collectable/statusbar/poisonStatus80.png",
    "img/collectable/statusbar/poisonStatus60.png",
    "img/collectable/statusbar/poisonStatus40.png",
    "img/collectable/statusbar/poisonStatus20.png",
    "img/collectable/statusbar/poisonStatus0.png",
  ];
  availablePoisonBubbles = 0;

  constructor() {
    super();
    this.loadImage("img/collectable/statusbar/poisonStatus0.png");
    this.loadImages(this.IMAGES_STATUSBAR_POISON);
    this.x = 210;
    this.y = 0;
    this.width = 190;
    this.height = 50;
    this.setAvailablePoison(0);
  }

  /**
   * Sets the available poison bubbles and updates the image based on the resolved index.
   *
   * @param {number} availablePoisonBubbles - The number of available poison bubbles.
   */
  setAvailablePoison(availablePoisonBubbles) {
    this.availablePoisonBubbles = availablePoisonBubbles;
    let path = this.IMAGES_STATUSBAR_POISON[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index for selecting the appropriate image based on the number of available poison bubbles.
   *
   * @returns {number} - The resolved index for selecting the image.
   */
  resolveImageIndex() {
    if (this.availablePoisonBubbles > 9) {
      return 0;
    } else if (this.availablePoisonBubbles > 6) {
      return 1;
    } else if (this.availablePoisonBubbles > 4) {
      return 2;
    } else if (this.availablePoisonBubbles > 2) {
      return 3;
    } else if (this.availablePoisonBubbles >= 1) {
      return 4;
    } else {
      return 5;
    }
  }
}
