console.log("test");
// configuration size screen
const H = window.innerHeight - 50;
const W = 1200;

var config = {
  type: Phaser.CANVAS,
  width: W,
  height: H,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  backgroundColor: "#000",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

function preload() {}

function create() {}

function update() {}
