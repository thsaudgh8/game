
// Component: 원 하나의 상태를 나타냄
class Component {
  constructor(radius, color, x, y) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  isClicked(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ScoreManager: 점수 관리
class ScoreManager {
  constructor(scoreElementId) {
    this.scoreEl = document.getElementById(scoreElementId);
    this.score = 0;
    this.update();
  }

  add(points = 1) {
    this.score += points;
    this.update();
  }

  reset() {
    this.score = 0;
    this.update();
  }

  update() {
    this.scoreEl.innerText = `Score: ${this.score}`;
  }
}

// TimerManager: 타이머 관리
class TimerManager {
  constructor(timerElementId, onTimeEnd) {
    this.timerEl = document.getElementById(timerElementId);
    this.intervalId = null;
    this.onTimeEnd = onTimeEnd;
  }

  start(duration = 10) {
    this.stop();
    let timeLeft = duration;
    this.timerEl.innerText = `Timer: ${timeLeft}`;

    this.intervalId = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        this.timerEl.innerText = `Timer: ${timeLeft}`;
      } else {
        this.stop();
        this.timerEl.innerText = "Game Over";
        this.onTimeEnd();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.timerEl.innerText = "Timer: 0";
  }
}

// PositionManager: 위치 계산 (겹치지 않도록)
class PositionManager {
  constructor(canvas, radius) {
    this.canvas = canvas;
    this.radius = radius;
  }

  getRandomPosition(existingPieces) {
    let x, y, valid;
    do {
      x = Math.random() * (this.canvas.width - 2 * this.radius) + this.radius;
      y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;

      valid = existingPieces.every(piece => {
        const dx = x - piece.x;
        const dy = y - piece.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance >= this.radius * 2.5;
      });
    } while (!valid);

    return { x, y };
  }
}

// GameArea: 전체 게임 관리
class GameArea {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 720;
    this.canvas.height = 480;
    this.pieces = [];

    this.scoreManager = new ScoreManager("score");
    this.timerManager = new TimerManager("timer", () => this.endGame());
    this.positionManager = new PositionManager(this.canvas, 40);

    this.canvas.addEventListener("click", e => this.handleClick(e));
  }

  startGame() {
    this.clear();
    this.scoreManager.reset();
    this.pieces = [];

    for (let i = 0; i < 6; i++) {
      const pos = this.positionManager.getRandomPosition(this.pieces);
      this.pieces.push(new Component(40, "#ff7777", pos.x, pos.y));
    }
    this.draw();
    this.timerManager.start();
  }

  startGameWithDelay() {
    let count = 3;
    const countdown = () => {
      this.clear();
      this.ctx.fillStyle = "#000";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(count, this.canvas.width / 2, this.canvas.height / 2);

      if (count > 0) {
        count--;
        setTimeout(countdown, 1000);
        this.scoreManager.reset();
        document.getElementById("timer").innerText = "Timer: 0";
      } else {
        this.startGame();
      }
    };
    countdown();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clear();
    this.pieces.forEach(p => p.draw(this.ctx));
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].isClicked(mouseX, mouseY)) {
        const pos = this.positionManager.getRandomPosition(this.pieces);
        this.pieces[i] = new Component(40, "#ff7777", pos.x, pos.y);
        this.draw();
        this.scoreManager.add();
        break;
      }
    }
  }

  endGame() {
    this.pieces = [];
    this.draw();
  }
}

// 기존 GameArea 클래스 코드는 그대로 유지

const game = new GameArea("gameCanvas");

// 전역 함수로 연결
function startGameWithDelay() {
  game.startGameWithDelay();
}

function clearGame() {
  game.timerManager.stop();
  game.pieces = [];
  game.draw();
  game.scoreManager.reset();
}

// 페이지 로드 시 자동 시작 제거
// game.startGameWithDelay();
