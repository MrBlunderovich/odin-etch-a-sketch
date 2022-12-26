const root = document.documentElement;
const screenSize = 32;
const screen = document.querySelector("#screen");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");

clearBtn.addEventListener("click", clear);
sizeBtn.addEventListener("click", size);

function createPixels(screenSize) {
  const screenSizeSquared = screenSize * screenSize;
  screen.replaceChildren();
  root.style.setProperty("--screen-size", screenSize);
  for (let i = 1; i <= screenSizeSquared; i++) {
    const pixel = document.createElement("div");
    pixel.addEventListener("mouseover", draw);
    pixel.classList.add("pixel");
    screen.appendChild(pixel);
  }
}

createPixels(screenSize);

function draw(event) {
  event.target.classList.add("darker");
}

function clear() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => pixel.classList.remove("darker"));
}

function size() {
  let newSize = 0;
  do {
    newSize = +prompt("Choose a grid size 10 to 100 pixels");
  } while (newSize < 10 || newSize > 100);
  createPixels(newSize);
}
