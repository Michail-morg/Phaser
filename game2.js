const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 }, // Гравитация вниз
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let coins;
let cursors;

function preload() {
    // Загрузка изображений
    this.load.image('sky', 'assets/sky1.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    // Фон
    this.add.image(400, 300, 'sky');

    // Платформы
    platforms = this.physics.add.staticGroup();

    // Создание платформ
    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // Нижняя платформа
    platforms.create(600, 400, 'ground'); // Высокая платформа
    platforms.create(200, 300, 'ground'); // Низкая платформа

    // Игрок
    player = this.physics.add.sprite(100, 450, 'ground');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Установка коллизий между игроком и платформами
    this.physics.add.collider(player, platforms);

    // Управление
    cursors = this.input.keyboard.createCursorKeys();

    // Монеты
    coins = this.physics.add.group({
        key: 'coin',
        repeat: 9,
        setXY: { x: 10, y: 0, stepX: 80 }
    });

    coins.children.iterate(function (coin) {
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        coin.setCollideWorldBounds(true);
        coin.setVelocity(Phaser.Math.Between(-20, 20), 20);
    });

    // Установка коллизий между монетами и платформами
    this.physics.add.collider(coins, platforms);

    // Установка коллизий между игроком и монетами
    this.physics.add.overlap(player, coins, collectCoin, null, this);
}

function update() {
    // Управление игроком
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    // Прыжок
    if (cursors.up.isDown) {
        player.setVelocityY(-330);
    }
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);
}