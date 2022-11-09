
/*Enemies the player must avoid*/
const Enemy = function Enemy(x, y, speed) {

    /*Variables applied to each of our instances go here,
    we've provided one for you to get started*/
    this.x = x + 94;
    this.y = y;
    this.speed = speed;

    /*The image/sprite for our enemies, this uses
    a helper we've provided to easily load images*/

    this.sprite = 'images/enemy-bug.png';
};

/*Update the enemy's position
Parameter: dt, a time delta between ticks (defined in engine.js)*/

Enemy.prototype.update = function (dt) {

   /*You should multiply any movement by the dt parameter
   which will ensure the game runs at the same speed for
   all computers.*/

   this.x += this.speed * dt;
        
    if (this.x >= 500) {
        this.x = 0;
    }
};

/* Draw the enemy on the screen, required method for game*/

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*Now write your own player class
This class requires an update(), render() and
a handleInput() method. */

const Player = function Player(x,y) {
    this.x = x;
    this.y = y;
    this.leftRigth = 101;
    this.upDown = 83;
    this.sprite = 'images/char-boy.png';
};

// collision with enemies and winning the game

Player.prototype.update = function(dt) {

    for(let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + 50.5 > this.x && enemy.x < this.x + 50.5)) {
            this.x = 190;
            this.y = 400;
        }
    }

    if (this.y <= 50) {
        allStars.push(star1);
        allStars.push(star2);
        allStars.push(star3);
        allStars.push(star4);
        allStars.push(star5);
        this.x = 190;
        this.y = 400; 
 
    }
    
    // to collect the Stars
    for(let winner of allStars) {
        if (this.y === winner.y && (winner.x + 50.5 > this.x && winner.x < this.x + 50.5 )) {
        allStars.splice(winner);
        }
        
    }  
    
};

// rendering player

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*action to perform when key direction is pressed*/

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == 'left') {
        if (this.x > 0) {
            this.x -= this.leftRigth;
        }
    }
    
    if (allowedKeys == 'right') {
        if (this.x < 300) {
            this.x += this.leftRigth;
        }
    }
    
    if (allowedKeys == 'up') {
        if (this.y > 50) {
            this.y -= this.upDown;
        }
    }
    
    if (allowedKeys == 'down') {
        if (this.y < 400) {
            this.y += this.upDown;
        }
    }
};

/*Stars shown when player gets to the water*/

const Star = function Star(x,y,speed,sprite) {
    this.x = x + 101;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/star.png';
};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.update = function (dt) {
        
        this.x += this.speed * dt;
    
        if (this.x >= 500) {
        this.x = -90;
    }
    };

/*Ojects Instantiated
Enemy objects in an array called allEnemies
Place the player object in a variable called player
star object placed in individual variables */

const allEnemies = [new Enemy(-200,234,30), new Enemy(-200,151,70), new Enemy(-200,68,40)];

let player = new Player(190,400);

let star1 = new Star(0,68,30);
let star2 = new Star(-50,68,50);
let star3 = new Star(10,68,20);
let star4 = new Star(0,234,30);
let star5 = new Star(-50,234,50);
const allStars = []; 


/* This listens for key presses and sends the keys to your
Player.handleInput() method. You don't need to modify this. */

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});