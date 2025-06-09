var myGamePiece;
var myScore;
var myGameArea;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(70, 70, "#00eeaa", 120, 200);
}

myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    ctx = myGameArea.context;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.fill();
}