const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = 1300;
let HEIGHT = 800;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let isClicked = false;
let hasRect = false;

let clickedMouseX = 0;
let clickedMouseY = 0;

let lastDifferenceX = 0;
let lastDifferenceY = 0;

onCanvasClick = (e) => {
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
};

let lastMouseX = 0;
let lastMouseY = 0;

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
      ctx.fillStyle = "rgba(22, 82, 240, 0.3)";
      ctx.strokeStyle = "rgb(22, 82, 240)";
    } else {
      ctx.fillStyle = "#FF463144";
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
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
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
};

canvas.addEventListener("mousemove", onCanvasMove);
canvas.addEventListener("click", onCanvasClick);
