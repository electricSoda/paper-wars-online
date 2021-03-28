//global functions
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//modal
const modal = document.getElementById("startgamepopup");
modal.style.display = "block";

//functions for the buttons on the menus
function startgame() {
    modal.style.display = "none";

    //key listners
    // check if key is pressed
    window.addEventListener("keydown", function(keypressed) {
        if (keypressed.key == "w" || keypressed.key == "a" || keypressed.key == "s" || keypressed.key == "d") {
            keys[keypressed.key] = true;
            mplayer.moving = true;
        };
        
    });
    //check if key is released
    window.addEventListener("keyup", function(keyreleased) {
        if (keyreleased.key == "w" || keyreleased.key == "a" || keyreleased.key == "s" || keyreleased.key == "d") {
            delete keys[keyreleased.key];
            mplayer.moving = false;
        };  
    });
};

function htp() {
    alert('WIP (work in progress)');
};

function chooseC() {
    alert("WIP  (work in progress)");
};

//-----------------------------------------------------------------------------------\\

//getting document ids, classes, and tags
const game = document.getElementById("game-container");

// jQuery (for canvas)
function readyINIT() {
    game.width = $(window).width() - 25;
    game.height = $(window).height() - 25;
}

$(document).ready(readyINIT);

//2d constant
const ctx = game.getContext('2d');

//keys
var keys = [];

//main player
const mplayer = {
    x: 500,
    y: 650,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 8,
    gravity: 2,
    moving: false
};

//load image
const mplayerSprite = new Image();
mplayerSprite.src = "crowley.png";

//draws the sprite onto the screen
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

//move player
function moveplayers() {
    if (keys['w'] && mplayer.y > 10) {
        mplayer.y -= mplayer.speed;
        mplayer.frameY = 3;
        mplayer.moving = true;
    } else if (keys['a'] && mplayer.x > 10) {
        mplayer.x -= mplayer.speed;
        mplayer.frameY = 1;
        mplayer.moving = true;
    } else if (keys['s'] && mplayer.y < game.height - mplayer.height) {
        mplayer.y += mplayer.speed;
        mplayer.frameY = 0;
        mplayer.moving = true;
    } else if (keys['d'] && mplayer.x < game.width - mplayer.width) {
        mplayer.x += mplayer.speed;
        mplayer.frameY = 2;
        mplayer.moving = true;
    } 
};

//character's animations
function characterframe() {
    if (mplayer.frameX < 3 && mplayer.moving) {
        mplayer.frameX++;
    } else {
        mplayer.frameX = 0;
    };
};

//animation runs at same screen refresh rate on all GPUs
let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
};

function animate() {
    if (document.hasFocus() == false) {
        mplayer.moving = false;
    }
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        //clears screen
        ctx.clearRect(0,0, game.width, game.height);

        //draws player
        drawSprite(mplayerSprite, mplayer.width * mplayer.frameX, mplayer.height * mplayer.frameY, mplayer.width, mplayer.height, mplayer.x, mplayer.y, mplayer.width, mplayer.height);

        //handle the character's animation
        if (mplayer.moving) {
            characterframe();
        }
        //move player before drawn on screen
        moveplayers()
       
    };
}

// start animating with 10 fps
startAnimating(10);


// deprecated animation function \\
/*
function animate() {
    ctx.clearRect(0,0, game.width, game.height);

    //draws player
    drawSprite(mplayerSprite, mplayer.width * mplayer.frameX, mplayer.height * mplayer.frameY, mplayer.width, mplayer.height, mplayer.x, mplayer.y, mplayer.width, mplayer.height);
    
    //move player before drawn on screen
    moveplayers()
    //handle the character's animation
    if (mplayer.moving) {
        characterframe();
    }
    //this continously updates the canvas
    requestAnimationFrame(animate);
};

animate();
*/