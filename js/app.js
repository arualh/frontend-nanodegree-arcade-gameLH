// Enemies our player must avoid
function Enemy (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Update the enemy's position, required method for game
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

}

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=  this.speed * dt;

    // set bugs location when it moves off the screen
    if (this.x > 505) { //frame ends here
        this.x = 0; // go back to the left side of the screen
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player (x, y) {

    this.x = x;
    this.y = y;
    this.w  = 50;
    this.h = 75;
    this.sprite = 'images/char-princess-girl.png';
    this.score = 0;
    this.princessScore = document.getElementById('princess-score');
    this.blueGem = document.getElementById('blue-score');
    this.screenBg = document.getElementById('game-over');
    this.screen = document.getElementById('game-over').firstChild;
}


Player.prototype.reset = function() {
    this.x = 200;
    this.y = 300;
};

Player.prototype.incrementScore = function() {

    this.score += 1;
    this.blueGem.innerHTML = this.score;

    if (this.score === 5) {
        this.screenBg.style.visibility = "visible";
        this.screen.style.display = "block";
        this.screen.innerHTML = "You won!";
        location.pause();

    }
};

Player.prototype.decrementScore = function() {

    this.princessScore.innerHTML = this.score -=1;

    if (this.score === -5) {
        this.screenBg.style.visibility = "visible";
        this.screen.style.display = "block";
        this.screen.innerHTML = "Game Over";
        location.pause();
    }

};

Player.prototype.update = function(dt) {

    this.screenBg.style.visibility = "hidden";
    // player is not allowed to go beyond canvas walls
    if ( this.x <= -40 || this.y >= 383 || this.x >= 401) {
        this.reset();

    } else if ( this.y <= 0 ) {
        // players acctual score
        this.princessScore.innerHTML = this.score += 1;
        this.reset();
    }

    this.collision();

};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.playSound = function() {
    var audio = new Audio('images/Frying Pan Hit.mp3');
    audio.play();
};

Player.prototype.playSoundGem = function() {
    var audio = new Audio('images/Metroid_Door-Brandino.mp3');
    audio.play();
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up') {
      this.y -= 80;
    }
    if (direction === 'down') {
      this.y += 80;
    }
    if (direction === 'left') {
      this.x -= 100;
    }
    if (direction === 'right') {
      this.x += 100;
    }
};

Player.prototype.collision = function() {
    for( var i = 0; i < allEnemies.length; i++){
        if (player.x < allEnemies[i].x + allEnemies[i].w &&
              player.x + player.w > allEnemies[i].x &&
              player.y < allEnemies[i].y + allEnemies[i].h &&
              player.h + player.y > allEnemies[i].y) {
              // collision detected!
              this.decrementScore();
              this.playSound();
              this.reset();
  }
    }


        if (player.x < gem.x + gem.w &&
              player.x + player.w > gem.x &&
              player.y < gem.y + gem.h &&
              player.h + player.y > gem.y) {
                //remove the gem
                gem.remove();
                this.incrementScore();
                this.playSoundGem();
            }

};

var gemImages = ['images/Gem-Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png', 'images/Key.png', 'images/Heart.png'];

// Gem class
 function Gem (x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = 'images/Gem-Blue.png';

    this.go = true;
}

// Render the gem on the screen
Gem.prototype.render = function() {
    //var i =  Math.floor( Math.random() * this.sprite.length );
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);

};

Gem.prototype.remove = function() {
     console.log("remove gem");
     this.x = -1000;
     this.y = -1000;

};
Gem.prototype.random = function (){
    //Math.random() * (max - min) + min;
    this.x = Math.floor( Math.random() * 400 + 1);
    this.y = Math.floor( Math.random() * 450 + 1);
    console.log(this.x, this.y);
};

Gem.prototype.update = function() {
    var that = this;

    if (this.go) {
        this.go = false;
        setTimeout(alertFunc, 3000);
    }

    function alertFunc() {
      gem.random();
      that.go = true;
    }
};


var gem = new Gem(120, 355, 60, 100);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 60, 100),
    new Enemy(0, 145, 150),
    new Enemy(0, 230, 200)
];

// Place the player object in a variable called player
var player = new Player(200, 300);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
