# 🎯 Simple Aimlab

간단한 반응 속도 테스트 게임입니다.  
Canvas 위에 생성된 원들을 클릭해 점수를 얻고, 제한 시간 내 최대한 많은 원을 맞춰보세요

발로란트 , 오버워치2 , CS2 등 플레이어의 에이밍이 중요한 게임을 하기전에  
손을 풀어주는 Aimlab 이라는 프로그램을 생각하고 제작 하였습니다. (2025.06.17)

---

## 전체 구조 요약

이 프로젝트는 크게 다음과 같은 파일들로 구성되어 있습니다:

### 1. main.html
- 전체 화면을 구성하는 HTML 파일입니다.
- <canvas> 요소를 이용해 게임 영역을 만듭니다.
- Start/Reset 버튼 및 게임 설명 UI를 포함합니다.
- <script type="module">을 통해 script.js를 로딩합니다.

### 2. style.css
- 게임 화면, 버튼, 설명 UI 등의 스타일을 담당합니다.
- 주요 스타일 요소:
  - 버튼 hover 효과
  - .info 섹션의 스타일
  - 캔버스 배경 및 테두리

### 3. script.js (메인 js파일)
- 게임 로직을 제어하는 핵심 파일입니다.
- 불러오는 모듈:
  - Component 클래스 (from component.js)
  - myGameArea 게임 영역 설정 (from myGameArea.js)
  - addScore 점수 증가 함수 (from addScore.js)
- 주요 함수:
  - startGameWithDelay() – 3초 카운트다운 후 게임 시작
  - startGame() – 원 생성 및 캔버스 그리기
  - gameTimer() – 10초 타이머
  - handleClick() – 원 클릭 시 처리
  - clearGame() – 게임 초기화
  - drawGamePieces() – 캔버스에 원 그리기
- 이벤트 바인딩:
  - DOMContentLoaded 이벤트 이후 버튼에 클릭 이벤트 연결

### 4. myGameArea.js
- Canvas를 초기화하고 그리드를 그리는 모듈입니다.
- 주요 메서드:
  - start(handleClick) – 캔버스 사이즈 설정 및 클릭 이벤트 바인딩
  - clear() – 캔버스를 초기화하면서 격자 배경을 다시 그림
  - drawGrid() – 격자 배경을 그림

### 5. component.js
- 원을 생성하고 그리는 클래스입니다.
- 클래스: Component
  - 속성: 반지름, 색상, x좌표, y좌표
  - 메서드: draw(ctx) – 원을 그림
  - 정적 메서드: getRandomPosition() – 겹치지 않도록 위치 계산

### 6. addScore.js
- 점수를 1점씩 증가시키는 간단한 유틸 함수 제공
- 함수: addScore() – 현재 점수를 가져와 1 증가

---

## 전체 흐름 (게임 실행 순서)

1. **HTML 로딩 완료 →** DOMContentLoaded 이벤트 발생
2. script.js 내 이벤트 리스너가 버튼과 연결됨
3. **유저가 Start 버튼 클릭 시:**
   - startGameWithDelay() 실행 → 3초 카운트다운
   - 이후 `startGame()` 호출 → 원 6개 생성 + 캔버스에 그림
   - gameTimer("on") → 10초 타이머 시작

4. **유저가 Canvas 클릭 시:**
   - handleClick() → 원과 거리 계산
   - 맞췄으면 해당 원 위치 이동 + addScore()로 점수 1점 증가

5. **10초 종료 시:**
   - gameTimer() → "Game Over" 표시 + 원 제거

6. **Reset 버튼 클릭 시:**
   - clearGame() → 원, 타이머, 점수 초기화

---

## Module Diagram 

![image](https://github.com/user-attachments/assets/86d00a01-59ca-498a-9666-753ffd7f6c54)

---

## scirpt.js Flowchart Diagram
 ![image](https://github.com/user-attachments/assets/cfe53ec4-666e-4858-8b33-c21ea51ae045)


---
## 실행 화면
![image](https://github.com/user-attachments/assets/235260fa-d33b-41b8-a799-5d4df20c173c)

![image](https://github.com/user-attachments/assets/33d59a25-30df-486b-bc09-5a3d9ecf5c73)


