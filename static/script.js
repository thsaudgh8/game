var myGamePiece;
var myScore;
var myGameArea;

function startGame() {
    myGameArea.start();
}

myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}