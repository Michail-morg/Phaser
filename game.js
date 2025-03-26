class PlatformerScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PlatformerScene' });
    }
  
    preload() {
      this.load.image('ground', 'assets/ground.png');
      this.load.image('player', 'path/to/player.png');
      this.load.image('coin', 'assets/coin.png');
    }
  
    create() {
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(300, 568, 'ground').setScale(2).refreshBody();
      this.platforms.create(500, 800, 'ground').setScale(2).refreshBody();
    
  
      this.player = this.physics.add.sprite(100, 450, 'player');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
  
      this.coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });
  
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.coins, this.platforms);
      this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
  
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
      }
    }
  
    collectCoin(player, coin) {
      coin.disableBody(true, true);
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: PlatformerScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    }
  };
  
  const game = new Phaser.Game(config);