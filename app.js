console.log("Javascript");
// configuration size screen
const H = window.innerHeight - 50;
const W = 1200;

var config = {
  type: Phaser.CANVAS,
  width: W,
  height: H,
  physics: {
    default: "matter",
    matter: {
      // gravity: { y: 500 },
      debug: true,
    },
  },
  backgroundColor: "#e8ad7d",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let char, cursors;

function preload() {
  // this.load.spritesheet("hero", "assets/char/spritesheet.png", { frameWidth: 50, frameHeight: 37 });
  // this.load.atlas("ninjacat", "assets/NinjaCat_images/Animations/Walk/NinjaCat.png", "assets/NinjaCat_images/Animations/Walk/NinjaCat.json");
  // this.load.image("ground", "assets/background/iceworld/Tiles/tundraMid.png");

  this.load.atlas("adventurer", "assets/char/adventurer.png", "assets/char/adventurer.json");
  this.load.image("tiles", "assets/tileset/moongraveyard/Tiles.png");
  this.load.tilemapTiledJSON("tilemap", "assets/tileset/moongraveyard.json");
}

function create() {
  let W = game.config.width;
  let H = game.config.height;

  const map = this.make.tilemap({ key: "tilemap" });
  const tileset = map.addTilesetImage("moontile", "tiles");

  const ground = map.createLayer("ground", tileset);
  ground.setCollisionByProperty({ collides: true });

  this.matter.world.convertTilemapLayer(ground);

  char = this.matter.add.sprite(W * 0.5, H * 0.5, "adventurer");
  char.setScale(1.5);
  char.setFixedRotation();

  cursors = this.input.keyboard.createCursorKeys();
  // this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.cameras.main.startFollow(char);

  /**
   * Animation Sprite
   */
  this.anims.create({
    key: "idle",
    frameRate: 4,
    frames: this.anims.generateFrameNames("adventurer", { start: 0, end: 3, prefix: "adventurer-idle-0", suffix: ".png" }),
    repeat: -1,
  });
  this.anims.create({
    key: "run",
    frameRate: 10,
    frames: this.anims.generateFrameNames("adventurer", { start: 0, end: 5, prefix: "adventurer-run-0", suffix: ".png" }),
    repeat: -1,
  });
  // end animation

  char.play("idle", true);
}

function update() {
  const speed = 2;

  if (cursors.left.isDown) {
    char.setVelocity(-speed);
    char.flipX = 1;
    char.play("run", true);
  } else if (cursors.right.isDown) {
    char.setVelocity(speed);
    char.flipX = 0;
    char.play("run", true);
  } else {
    char.setVelocity(0);
    char.play("idle", true);
  }
}
