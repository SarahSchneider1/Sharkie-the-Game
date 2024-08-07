class World {
  character = new Character();
  endboss = new Endboss();
  statusBarLife = new StatusbarLife();
  statusBarPoison = new StatusbarPoison();
  statusBarCoin = new StatusbarCoin();
  statusBarEndboss = new StatusbarEnbossLife();
  shotableObject = [];
  collectedPoison = [];
  collectedCoin = [];
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  endbossSpawning = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, checking for collisions and other game events.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionBubbleWithJellyfish();
      this.checkCollisionsWithBottle();
      this.checkCollisionsWithCoin();
      this.isCharacterCloseTo();
      this.checkSharkieInBossArea();
      this.checkCharacterCollisionsEnboss();
      this.checkCollisionBubbleWithEndboss();
    }, 100);
  }

  /**
   * Checks if the character collides with enemies and updates health.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarLife.setPercentage(this.character.healthPoints);
      }
    });
  }

  /**
   * Checks if the character collides with the endboss and updates health.
   */
  checkCharacterCollisionsEnboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.statusBarLife.setPercentage(this.character.healthPoints);
    }
  }

  /**
   * Checks if the character is close to a Pufferfish and performs actions if so.
   */
  isCharacterCloseTo() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Pufferfish && this.character.isNearToSharkie(enemy) && this.character.slapAnimationTime) {
        setTimeout(() => {
          enemy.speed = 0;
          enemy.deadAnimation(this.character.otherDirection);
        }, 200);
      }
    });
  }

  /**
   * Checks if the character collects poison bottles and updates the status bar.
   */
  checkCollisionsWithBottle() {
    this.level.poison.forEach((p, bubbleIndex) => {
      if (this.character.isColliding(p)) {
        this.collectedPoison.push(level1.poison[bubbleIndex]);
        level1.poison.splice(bubbleIndex, 1);
        collectPoisonAudio();
      }
    });
    this.statusBarPoison.setAvailablePoison(this.collectedPoison.length);
  }

  /**
   * Checks if the character collects coins and updates the status bar.
   */
  checkCollisionsWithCoin() {
    this.level.coin.forEach((p, bubbleIndex) => {
      if (this.character.isColliding(p)) {
        this.collectedCoin.push(level1.coin[bubbleIndex]);
        level1.coin.splice(bubbleIndex, 1);
        collectCoinAudio();
      }
    });
    this.statusBarCoin.setCollectedCoins(this.collectedCoin.length);
  }

  /**
   * Checks if the character is in the boss area and triggers endboss spawning.
   */
  checkSharkieInBossArea() {
    if (this.character.x > 2050) {
      this.endbossSpawning = true;
      this.endboss.endbossIntro = true;
      this.statusBarEndboss.y = 40;
    }
  }

  /**
   * Checks if shotable objects collide with jellyfish and updates their state.
   */
  checkCollisionBubbleWithJellyfish() {
    const jellyfishArray = level1.enemies.filter((enemy) => enemy instanceof Jellyfish);
    this.shotableObject.forEach((shot, shotIndex) => {
      jellyfishArray.forEach((jelly, index) => {
        if (shot.isColliding(jelly)) {
          this.shotableObject.splice(shotIndex, 1);
          this.level.enemies[index].isShot = true;
          jellyFishBubble();
        }
      });
    });
  }

  /**
   * Checks if shotable objects collide with the endboss and updates its health.
   */
  checkCollisionBubbleWithEndboss() {
    this.shotableObject.forEach((shot, shotIndex) => {
      if (shot.isColliding(this.endboss)) {
        this.shotableObject.splice(shotIndex, 1);
        this.endboss.hit();
        jellyFishBubble();
        this.statusBarEndboss.setPercentage(this.endboss.healthPoints);
      }
    });
  }

  /**
   * Draws all elements on the canvas, including background, moving objects, and status bars.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.drawBackgroundObjects();
    this.drawMovingObjects();
    this.drawStatusBarObjects();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws background objects on the canvas.
   */
  drawBackgroundObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  /**
   * Draws moving objects on the canvas, including enemies and the character.
   */
  drawMovingObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.shotableObject);
    this.addObjectsToMap(this.level.poison);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bubbles);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws status bars on the canvas.
   */
  drawStatusBarObjects() {
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarPoison);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * Draws a single object on the canvas, flipping it if needed.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImageHorizontally(mo);
    }
    mo.draw(this.ctx);
    // mo.drawHitbox(this.ctx);
    if (mo.otherDirection) {
      this.restoreImageOrientation(mo);
    }
  }

  /**
   * Draws multiple objects on the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Flips the image horizontally for objects facing the other direction.
   */
  flipImageHorizontally(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original orientation of the image after flipping.
   */
  restoreImageOrientation(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
