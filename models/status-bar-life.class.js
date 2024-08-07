class StatusbarLife extends DrawableObjects {
  IMAGES_STATUSBAR = [
    "img/collectable/statusbar/lifeStatus0.png",
    "img/collectable/statusbar/lifeStatus20.png",
    "img/collectable/statusbar/lifeStatus40.png",
    "img/collectable/statusbar/lifeStatus60.png",
    "img/collectable/statusbar/lifeStatus80.png",
    "img/collectable/statusbar/lifeStatus100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.x = 20;
    this.y = 0;
    this.width = 190;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage and updates the image based on the resolved index.
   *
   * @param {number} percentage - The percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index for selecting the appropriate image based on the percentage value.
   *
   * @returns {number} - The resolved index for selecting the image.
   */
  resolveImageIndex() {
    if (this.percentage > 80) return 5;
    if (this.percentage > 60) return 4;
    if (this.percentage > 40) return 3;
    if (this.percentage > 20) return 2;
    if (this.percentage > 5) return 1;
    return 0;
  }
}
