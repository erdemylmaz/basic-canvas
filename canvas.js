const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resetBtn = document.querySelector(".reset-btn");

const eraserBtn = document.querySelector(".eraser-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const increaseBtn = document.querySelector(".increase-btn");
const eraserFontDiv = document.querySelector(".eraser-font-size");

const allBtns = document.querySelectorAll(".tool");
const mainBtn = document.querySelector(".main-tool");
const paintBtn = document.querySelector(".paint-tool");
const rulerBtn = document.querySelector(".ruler-tool");
const horizontalBtn = document.querySelector(".horizontal-tool");
const fullHorizontalBtn = document.querySelector(".f-horizontal-tool");
const nextHorizontalBtn = document.querySelector(".n-horizontal-tool");

let pageWIDTH = document.body.getBoundingClientRect().width;
let pageHEIGHT = document.body.getBoundingClientRect().height;

let WIDTH = pageWIDTH;
let HEIGHT = pageHEIGHT - 2.4;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let isClicked = false;
let selected = "main";

let hIsClicked = false;
let hIsDone = false;

let lastHX = 0;
let lastHY = 0;

let fIsClicked = false;
let fIsDone = false;

let nIsClicked = false;
let nIsDone = false;

let paintIsClicked = false;

function reset() {
  allBtns.forEach((btn) => {
    btn.classList.contains("tool-active")
      ? btn.classList.remove("tool-active")
      : "";
  });

  isClicked = false;

  hIsClicked = false;
  hIsDone = false;

  fIsClicked = false;
  fIsDone = false;

  nIsClicked = false;
  nIsDone = false;

  eraserBtn.style.display = "none";
  eraserBtn.classList.remove("eraser-active");

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

resetBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
});

paintBtn.addEventListener("click", () => {
  if (selected != "paint") {
    reset();
  }

  selected = "paint";
  paintBtn.classList.add("tool-active");

  eraserBtn.style.display = "flex";
});

eraserBtn.addEventListener("click", () => {
  selected = "eraser";

  paintBtn.classList.remove("tool-active");

  eraserBtn.style.display = "flex";
  eraserBtn.classList.add("eraser-active");

  decreaseBtn.style.display = "flex";
  increaseBtn.style.display = "flex";
  eraserFontDiv.style.display = "flex";
});

mainBtn.addEventListener("click", () => {
  if (selected != "main") {
    reset();
  }

  selected = "main";
  mainBtn.classList.add("tool-active");
});

rulerBtn.addEventListener("click", () => {
  if (selected != "ruler") {
    reset();
  }

  selected = "ruler";
  rulerBtn.classList.add("tool-active");
});

horizontalBtn.addEventListener("click", () => {
  if (selected != "horizontal") {
    reset();
  }

  horizontalBtn.classList.add("tool-active");
  selected = "horizontal";
});

fullHorizontalBtn.addEventListener("click", () => {
  if (selected != "full-horizontal") {
    reset();
  }

  selected = "full-horizontal";
  fullHorizontalBtn.classList.add("tool-active");
});

nextHorizontalBtn.addEventListener("click", () => {
  if (selected != "next-horizontal") {
    reset();
  }

  nextHorizontalBtn.classList.add("tool-active");
  selected = "next-horizontal";
});

let hasRect = false;

let clickedMouseX = 0;
let clickedMouseY = 0;

let lastDifferenceX = 0;
let lastDifferenceY = 0;

let lastFX = 0;
let lastFY = 0;

onCanvasClick = (e) => {
  if (selected == "ruler") {
    if (hasRect) {
      hasRect = false;
      isClicked = false;
    } else {
      let differenceX = 0;
      let differenceY = 0;

      if (lastDifferenceX < 0) {
        differenceX = -8;
      } else {
        differenceX = 8;
      }

      if (lastDifferenceY < 0) {
        differenceY = -8;
      } else {
        differenceY = 8;
      }
      ctx.clearRect(
        clickedMouseX - differenceX / 2,
        clickedMouseY - differenceY / 2,
        lastDifferenceX + differenceX,
        lastDifferenceY + differenceY
      );

      clickedMouseX = e.layerX;
      clickedMouseY = e.layerY;

      ctx.fillStyle = "rgba(22, 82, 240, 0.3)";
      ctx.fillRect(clickedMouseX, clickedMouseY, 1, 1);
      isClicked = true;
    }
  }

  if (selected == "full-horizontal" && !fIsDone) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    fIsClicked = true;
    fIsDone = true;

    ctx.fillStyle = "rgb(22, 82, 240)";
    ctx.fillRect(mouseX, mouseY, WIDTH - mouseX, 1);
    ctx.fillRect(0, mouseY, WIDTH - (WIDTH - mouseX), 1);
  }

  if (selected == "next-horizontal" && !nIsDone) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    nIsClicked = true;
    nIsDone = true;

    ctx.fillStyle = "rgb(22, 82, 240)";
    ctx.fillRect(mouseX, mouseY, WIDTH, 1);
  }

  if (selected == "horizontal" && !hIsDone) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    hIsClicked = true;

    lastHX = mouseX;
    lastHY = mouseY;

    ctx.fillRect(mouseX, mouseY, 1, 1);
  }
};

let lastMouseX = 0;
let lastMouseY = 0;

let lMouseX = 0;
let lMouseY = 0;

let hMouseX = 0;
let hMouseY = 0;

onCanvasMove = (e) => {
  if (isClicked) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    if (lastMouseX != mouseX || lastMouseY != mouseY) {
      let differenceX = 0;
      let differenceY = 0;

      if (lastDifferenceX < 0) {
        differenceX = -8;
      } else {
        differenceX = 8;
      }

      if (lastDifferenceY < 0) {
        differenceY = -8;
      } else {
        differenceY = 8;
      }

      ctx.clearRect(
        clickedMouseX - differenceX / 2,
        clickedMouseY - differenceY / 2,
        lastDifferenceX + differenceX,
        lastDifferenceY + differenceY
      );
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    hasRect = true;

    let differenceX = Math.round(mouseX - clickedMouseX);
    let differenceY = Math.round(mouseY - clickedMouseY);

    lastDifferenceX = differenceX;
    lastDifferenceY = differenceY;

    if (differenceY < 0) {
      ctx.fillStyle = "rgba(22, 82, 240, 0.1)";
      ctx.strokeStyle = "rgb(22, 82, 240)";
    } else {
      ctx.fillStyle = "#FF463111";
      ctx.strokeStyle = "#FF4631";
    }
    ctx.fillRect(clickedMouseX, clickedMouseY, differenceX, differenceY);

    ctx.strokeRect(
      clickedMouseX - 1,
      clickedMouseY - 1,
      differenceX + 2,
      differenceY + 2
    );

    let rectCenterX = clickedMouseX + differenceX / 2;
    let rectCenterY = clickedMouseY + differenceY / 2;

    if (lastDifferenceX > 3 || lastDifferenceX < -3) {
      ctx.fillRect(rectCenterX, clickedMouseY, 1, differenceY);
    }

    if (lastDifferenceY > 3 || lastDifferenceY < -3) {
      ctx.fillRect(clickedMouseX, rectCenterY, differenceX, 1);
    }

    if (
      (lastDifferenceX > 150 || lastDifferenceX < -150) &&
      (lastDifferenceY > 110 || lastDifferenceY < -110)
    ) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.font = "12px Arial";
      ctx.fillText(`X: ${clickedMouseX}`, rectCenterX + 4, rectCenterY - 48);
      ctx.fillText(`Y: ${clickedMouseY}`, rectCenterX + 4, rectCenterY - 36);

      ctx.fillText(`Mouse X: ${mouseX}`, rectCenterX + 4, rectCenterY - 20);
      ctx.fillText(`Mouse Y: ${mouseY}`, rectCenterX + 4, rectCenterY - 8);

      ctx.fillText(
        `Width: ${Math.abs(lastDifferenceX)}`,
        rectCenterX + 4,
        rectCenterY + 24
      );
      ctx.fillText(
        `Height: ${Math.abs(lastDifferenceY)}`,
        rectCenterX + 4,
        rectCenterY + 36
      );
    }
  }
  if (selected == "main") {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    if (lMouseX != mouseX || lMouseY != mouseY) {
      ctx.clearRect(lMouseX, lMouseY, WIDTH - lMouseX, 1);
      ctx.clearRect(lMouseX, lMouseY, 1, HEIGHT - lMouseY);

      ctx.clearRect(0, lMouseY, WIDTH - (WIDTH - lMouseX), 1);
      ctx.clearRect(lMouseX, 0, 1, HEIGHT - (HEIGHT - lMouseY));
    }

    lMouseX = mouseX;
    lMouseY = mouseY;

    ctx.fillStyle = "white";
    ctx.fillRect(mouseX, mouseY, WIDTH - mouseX, 1);
    ctx.fillRect(mouseX, mouseY, 1, HEIGHT - mouseY);

    ctx.fillRect(0, mouseY, WIDTH - (WIDTH - mouseX), 1);
    ctx.fillRect(mouseX, 0, 1, HEIGHT - (HEIGHT - mouseY));
  }

  if (selected == "full-horizontal" && !fIsDone) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    if (lastFX != mouseX || lastFY != mouseY) {
      ctx.clearRect(lastFX, lastFY, WIDTH - lastFX, 1);

      ctx.clearRect(0, lastFY, WIDTH - (WIDTH - lastFX), 1);
    }

    lastFX = mouseX;
    lastFY = mouseY;

    ctx.fillStyle = "white";
    ctx.fillRect(mouseX, mouseY, WIDTH - mouseX, 1);
    ctx.fillRect(0, mouseY, WIDTH - (WIDTH - mouseX), 1);
  }

  if (selected == "next-horizontal" && !nIsDone) {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    if (lastFX != mouseX || lastFY != mouseY) {
      ctx.clearRect(lastFX, lastFY, WIDTH - lastFX, 1);
    }

    lastFX = mouseX;
    lastFY = mouseY;

    ctx.fillStyle = "white";
    ctx.fillRect(mouseX, mouseY, WIDTH - mouseX, 1);
  }

  // if (selected == "horizontal" && !hIsDone && hIsClicked) {
  //   let mouseX = e.layerX;
  //   let mouseY = e.layerY;

  //   if (hMouseX != mouseX || hMouseY != mouseY) {
  //     ctx.clearRect(0, 0, WIDTH, HEIGHT);
  //   }

  //   hMouseX = mouseX;
  //   hMouseY = mouseY;

  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(lastHX, mouseY);
  //   ctx.stroke();
  // }
};

let paintThickness = 4;

function paint(e) {
  let mouseX = e.layerX;
  let mouseY = e.layerY;

  ctx.fillRect(mouseX, mouseY, paintThickness, paintThickness);
}

function paintClick(e) {
  if (selected == "paint") {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    ctx.fillRect(mouseX, mouseY, paintThickness, paintThickness);

    canvas.addEventListener("mousemove", paint);
  }
}

canvas.addEventListener("mousemove", onCanvasMove);
canvas.addEventListener("click", onCanvasClick);

canvas.addEventListener("mousedown", paintClick);

let lastEX = 0;
let lastEY = 0;

let eraserThickness = 24;

decreaseBtn.addEventListener("click", () => {
  eraserThickness--;
  eraserFontDiv.textContent = eraserThickness;
});

increaseBtn.addEventListener("click", () => {
  eraserThickness++;
  eraserFontDiv.textContent = eraserThickness;
});

canvas.addEventListener("mousemove", (e) => {
  if (selected == "eraser") {
    let mouseX = e.layerX;
    let mouseY = e.layerY;

    if (lastEX != mouseX || lastEY != mouseY) {
      ctx.clearRect(
        lastEX - 8,
        lastEY - 8,
        eraserThickness + 8,
        eraserThickness + 8
      );
    }

    lastEX = mouseX;
    lastEY = mouseY;

    ctx.strokeStyle = "white";
    ctx.strokeRect(mouseX - 6, mouseY - 6, eraserThickness, eraserThickness);
  }
});

// remove paint event listener
canvas.addEventListener("mouseup", () => {
  if (selected == "paint") {
    canvas.removeEventListener("mousemove", paint, false);
  }
});

// remove eraser event listner
canvas.addEventListener("mouseup", () => {
  if (selected == "eraser") {
    canvas.removeEventListener("mousemove", eraser, false);
  }
});

selected = "measure";

let randomX = Math.random() * WIDTH;
let randomY = Math.random() * HEIGHT;

let beforeX = randomX;
let beforeY = randomY;

let isFirst = true;
let clicked = false;

let thickness = 1;

let colorCodes = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

function computerPaint() {
  for (let x = 0; x < Math.pow(2, 20); x++) {
    let side = Math.floor(Math.random() * 4);

    let colorCode = "";

    // for (let i = 0; i < 6; i++) {
    //   let randomNumber = Math.floor(Math.random() * colorCodes.length);
    //   let code = colorCodes[randomNumber];

    //   colorCode += code;
    // }

    ctx.fillStyle = "#fff";

    ctx.fillStyle = `#${colorCode}`;

    while (beforeX > WIDTH || beforeX < 0) {
      beforeX = Math.random() * WIDTH;

      if (beforeX < WIDTH || beforeX > 0) {
        break;
      }
    }

    while (beforeY > HEIGHT || beforeY < 0) {
      beforeY = Math.random() * HEIGHT;

      if (beforeY < HEIGHT || beforeY > 0) {
        break;
      }
    }

    if (side == 0) {
      beforeY -= thickness;

      ctx.fillRect(beforeX, beforeY, thickness, thickness);
    }
    if (side == 1) {
      beforeX += thickness;

      ctx.fillRect(beforeX, beforeY, thickness, thickness);
    }
    if (side == 2) {
      beforeY += thickness;

      ctx.fillRect(beforeX, beforeY, thickness, thickness);
    }
    if (side == 3) {
      beforeX -= thickness;

      ctx.fillRect(beforeX, beforeY, thickness, thickness);
    }
  }
}

computerPaint();

let startPainting = setInterval(() => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  computerPaint();
}, 10000);

canvas.addEventListener("click", () => {
  if (!clicked) {
    clearInterval(startPainting);

    clicked = true;
  } else {
    startPainting = setInterval(() => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      computerPaint();
    }, 5000);

    clicked = false;
  }

  console.log(clicked);
});
