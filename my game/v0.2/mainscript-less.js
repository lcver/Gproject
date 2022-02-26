var configuration = {
	type : Phaser.CANVAS,
	width: window.innerWidth,
	height: window.innerHeight,
	// width: 384,
	// height: 224,
	physics: {
		default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
	},
	scene: {
		preload: preload,
		create: create,
		update:update
	}
};

var game = new Phaser.Game(configuration);
var char;
var platforms;
var cursors;
var move = false;
var jump = false;
var down = false;

function preload()
{
	this.load.image('px1', 'assets/background/plx-1.png')
	this.load.image('px2', 'assets/background/plx-2.png')
	this.load.image('px3', 'assets/background/plx-3.png')
	this.load.image('px4', 'assets/background/plx-4.png')
	this.load.image('px5', 'assets/background/plx-5.png')
	this.load.image('ground', 'assets/background/platform.png');
	this.load.spritesheet('char', 'assets/char/spritesheet_right.png'
				, {frameWidth:50, frameHeight:37});

}
function create()
{
	this.add.image(192,108,'px1');
	this.add.image(192,108,'px2');
	this.add.image(192,108,'px3');
	this.add.image(192,108,'px4');
	this.add.image(192,108,'px5');

	platforms = this.physics.add.staticGroup();

	platforms.create(192,200,'ground').refreshBody();
	// platforms.create(185,200,'ground').refreshBody();
	// platforms.body.setSize(0, 0, 100, 0);


	char = this.physics.add.sprite(10,150,'char');
	char.body.setSize(15, 0, 10, 0);
	// char.angle = 180;
	// char.x = 180;

	char.setBounce(0.1);
	char.setCollideWorldBounds(true);

	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers(
			'char',{start:8, end:13}),
		frameRate: 10,
		repeat: -1
	});

    this.anims.create({
        key: 'crouch',
		frames: this.anims.generateFrameNumbers(
			'char',{start:4, end:7}),
		frameRate: 5,
		repeat: -1
    });
    this.anims.create({
    	key: 'idle',
		frames: this.anims.generateFrameNumbers(
			'char',{start:1, end:3}),
		frameRate: 5,
		repeat: -1
    });

    this.anims.create({
    	key: 'jump',
		frames: this.anims.generateFrameNumbers(
			'char',{start:14, end:23}),
		frameRate: 20,
		repeat: 0
    });

	this.physics.add.collider(char, platforms);

	cursors = this.input.keyboard.createCursorKeys();

}

function update()
{
	console.log(move);
	document.addEventListener('keyup', function () {
		char.setVelocityX(0);
		char.setVelocityY(0);
		move = false;
		jump = false;
		down = false;
	});

	if(char.body.touching.down && move == false)
	{
		console.log('take idle');
		char.anims.play('idle', true);
	}
	if(cursors.up.isDown && char.body.touching.down){
		char.setVelocityX(0);
		char.setVelocityY(-200);
		char.anims.play('jump', true);
		jump = true;
		console.log('jump');
	}
	if(cursors.down.isDown){
		down = true;
		char.setVelocityX(0);
		// char.setVelocityY(-200);
		char.anims.play('crouch', true);
		console.log('crouch');
	}
	if(cursors.right.isDown && down === false){
		move = true;
		char.setVelocityX(100);
		// char.setVelocityY(-200);
		if(char.body.touching.down && jump == false){
			char.anims.play('right', true);
		}
		console.log('walk to right');
	}
	if(cursors.left.isDown && down === false){
		move = true;
		char.setVelocityX(-100);
		// char.setVelocityY(-200);
		if(char.body.touching.down && jump == false){
			char.anims.play('right', true);
		}
		console.log('walk to left');
	}
	
}