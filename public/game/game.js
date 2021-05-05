//canvas
game = document.getElementById('game');
ctx = game.getContext('2d');

//resize
game.height = window.innerHeight;
game.width = window.innerWidth;

//win resize
window.addEventListener('resize', function () {
    game.height = window.innerHeight;
    game.width = window.innerWidth;
});

//mouse
var drawing = false;

function draw(e) {
    if (!drawing) { return };

    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

game.addEventListener('mousedown', function (e) {
    drawing = true;
    draw(e);
});

game.addEventListener('mouseup', function () {
    drawing = false;
    ctx.beginPath();
});

game.addEventListener('mousemove', draw);