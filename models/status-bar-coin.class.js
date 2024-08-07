class StatusbarCoin extends DrawableObjects {
  IMAGES_STATUSBAR_COIN = [
    "img/collectable/statusbar/coinStatus100.png",
    "img/collectable/statusbar/coinStatus80.png",
    "img/collectable/statusbar/coinStatus60.png",
    "img/collectable/statusbar/coinStatus40.png",
    "img/collectable/statusbar/coinStatus20.png",
    "img/collectable/statusbar/coinStatus0.png",
  ];
  collectedCoins = 0;

  constructor() {
    super();
    this.loadImage("img/collectable/statusbar/poisonStatus0.png");
    this.loadImages(this.IMAGES_STATUSBAR_COIN);
    this.x = 410;
    this.y = 0;
    this.width = 190;
    this.height = 50;
    this.setCollectedCoins(0);
  }

  /**
   * Sets the number of collected coins, updates the image based on the resolved index.
   *
   * @param {number} collectedCoins - The number of collected coins.
   */
  setCollectedCoins(collectedCoins) {
    this.collectedCoins = collectedCoins;
    let path = this.IMAGES_STATUSBAR_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index for selecting the appropriate image based on the number of collected coins.
   *
   * @returns {number} - The resolved index for selecting the image.
   */
  resolveImageIndex() {
    if (this.collectedCoins > 9) return 0;
    if (this.collectedCoins > 6) return 1;
    if (this.collectedCoins > 4) return 2;
    if (this.collectedCoins > 2) return 3;
    if (this.collectedCoins >= 1) return 4;
    return 5;
  }
}
