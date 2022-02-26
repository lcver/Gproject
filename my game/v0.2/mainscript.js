const H = window.innerHeight-4
const W = window.innerWidth-3
var config = {
	type: Phaser.CANVAS,
	width: W,
	height: H,
	physics: {
		default: 'arcade',
		arcade : {
			gravity : { y : 500},
			debug : false
		}
	},
	scene : {
		preload : preload,
		create : create,
		update : update

	}
}


var game = new Phaser.Game(config);
var char;
var platforms;
var cursors;
var key;
var cooldown = 0;
var move = false;
var jump = false;
var down = false;
var attack = false;
var core =  {};

// debug
var action;
var direction = "right";

function preload(){
	this.load.image('px1', 'assets/background/plx-1.png')
	this.load.image('px2', 'assets/background/plx-2.png')
	this.load.image('px3', 'assets/background/plx-3.png')
	this.load.image('px4', 'assets/background/plx-4.png')
	this.load.image('px5', 'assets/background/plx-5.png')
	this.load.image('ground', 'assets/background/platform.png');
	this.load.spritesheet('char', 'assets/char/spritesheet-1.5.png'
				, {frameWidth:50, frameHeight:37});
}

function create(){
	const bg1 = this.add.image(W/2, H/2,'px1');
	bg1.setScale(3.5)
	const bg2 = this.add.image(W/2, H/2,'px2');
	bg2.setScale(3.5)
	const bg3 = this.add.image(W/2, H/2,'px3');
	bg3.setScale(3.5)
	const bg4 = this.add.image(W/2, H/2,'px4');
	bg4.setScale(3.5)
	const bg5 = this.add.image(W/2, H/2,'px5');
	bg5.setScale(3.5)
	
	
	// const bg = this.add.image(W/2, H/2, 'sky');
	// bg.setScale(5)

	platforms = this.physics.add.staticGroup();

	// platforms.create(152,200,'ground').refreshBody();
	platforms.create(W/2,H+75,'ground').setScale(5).refreshBody();
	platforms.create(200,H-75,'ground').refreshBody();
	// platforms.create(152,200,'ground').refreshBody();
	// platforms.create(185,200,'ground').refreshBody();
	// platforms.body.setSize(0, 0, 100, 0);


	char = this.physics.add.sprite(10,150,'char');
	// console.log(char);
	// debugger;
	// char.scaleX = -1;
	char.body.setSize(15, 0, 10, 0);
	char.setScale(1.3)

	char.setBounce(0.05);
	char.setCollideWorldBounds(true);

	this.physics.add.collider(char, platforms);

	cursors = this.input.keyboard.createCursorKeys();
	this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

	this.anims.create({
		key: 'run',
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
    	key: 'idle_2',
		frames: this.anims.generateFrameNumbers(
			'char',{start:38, end:41}),
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
	this.anims.create({
    	key: 'fall',
		frames: this.anims.generateFrameNumbers(
			'char',{start:22, end:23}),
		frameRate: 20,
		repeat: 0
    });

    // this.anims.create({
    // 	key:'take_sword',
    // 	frames: this.anims.generateFrameNumbers(
    // 		'char', {start:70, end:73}),
    // 	frameRate: 10,
    // 	repeat: 0,
    // 	onUpdate: takingSword
    // });

    this.anims.create({
    	key:'attack',
    	frames: this.anims.generateFrameNumbers(
    		'char', {start:41, end:59}),
    	frameRate: 20,
    	repeat: 0
    });
}

function update(){
	document.addEventListener('keyup', function () {
		char.setVelocityX(0);
		char.setVelocityY(0);
		move = false;
		jump = false;
		down = false;
		attack = false;
	});

	if(this.D.isDown){
		char.anims.play('attack', true);
		attack = true;
		action = "attack";
	}
	if(char.body.touching.down && move == false && down == false && attack == false)
	{
		char.anims.play('idle', true);
		action = "stand";
	} else if (char.body.touching.down == false && jump == false) {
		char.anims.play('fall', true);
		action = "fall";
	}
	
	if(cursors.up.isDown && char.body.touching.down){
		char.setVelocityX(0);
		char.setVelocityY(-200);
		char.anims.play('jump', true);
		jump = true;
		action = "jump";
	}
	if(cursors.down.isDown){
		char.anims.play('crouch', true);
		down = true;
		move = false;
		char.setVelocityX(0);
		// char.setVelocityY(-200);
		action = "crouch";
	}
	if(cursors.right.isDown && down === false){
		// char.scaleX = 1;
		char.flipX = 0;
		move = true;
		char.setVelocityX(100);
		// char.setVelocityY(-200);
		if(char.body.touching.down && jump == false && attack == false){
			char.anims.play('run', true);
			action = "move";
			direction = "right";
		}else if(char.body.touching.down && attack == true)
		{
			char.setVelocityX(0);
		}

	}
	if(cursors.left.isDown && down === false){
		// char.scaleX = -1;
		char.flipX = 1;
		move = true;
		char.setVelocityX(-100);
		// char.setVelocityY(-200);
		if(char.body.touching.down && jump == false && attack == false){
			char.anims.play('run', true);
			action = "move";
			direction = "left";
		}else if(char.body.touching.down && attack == true)
		{
			char.setVelocityX(0);
		}
	}

	core = {
		action: action,
		direct : direction
	};
	console.log(core);
}