var myGamePieces = [];
var myGameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function () {
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");

        // 캔버스 클릭 이벤트 추가
        this.canvas.addEventListener("click", handleClick);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// 🎯 게임 시작 (원 생성)
function startGame() {
    myGamePieces = [];

    for (let i = 0; i < 6; i++) {
        let position = getRandomPosition();
        myGamePieces.push(new component(40, "#00eeaa", position.x, position.y));
    }

    drawGamePieces();
}
function clearGame() {
    myGamePieces = [];  // 원 리스트 비우기
    myGameArea.clear(); // 캔버스 지우기


    let score = document.getElementById("score");
    score.innerText = "Score: 0"; // 점수를 0으로 설정
}

// 🖱 원 클릭 시 삭제 후 재생성
function handleClick(event) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    for (let i = 0; i < myGamePieces.length; i++) {
        let piece = myGamePieces[i];
        let dx = mouseX - piece.x;
        let dy = mouseY - piece.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < piece.radius) {
            let newPosition = getRandomPosition();
            myGamePieces[i] = new component(40, "#00eeaa", newPosition.x, newPosition.y);
            drawGamePieces();
            break;
        }
    }
}

// 🎨 원을 화면에 그리는 함수
function drawGamePieces() {
    myGameArea.clear();
    let ctx = myGameArea.context;

    for (let piece of myGamePieces) {
        ctx.fillStyle = piece.color;
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// 🎯 원끼리 겹치지 않도록 랜덤 위치 생성
function getRandomPosition() {
    let x, y, valid;
    let radius = 40;

    do {
        x = Math.random() * (myGameArea.canvas.width - 2 * radius) + radius;
        y = Math.random() * (myGameArea.canvas.height - 2 * radius) + radius;

        valid = myGamePieces.every(piece => {
            let dx = x - piece.x;
            let dy = y - piece.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance >= radius * 2.5;
        });
    } while (!valid);

    return { x, y };
}

function component(radius, color, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
}

// 🎯 캔버스를 초기화 상태에서 생성
myGameArea.start();
