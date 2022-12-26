const root = document.documentElement;
const screenSize = 32;
const screen = document.querySelector("#screen");
const screenSizeSquared = screenSize * screenSize;
const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", clear);
root.style.setProperty("--screen-size", screenSize);

for (let i = 1; i <= screenSizeSquared; i++) {
  const pixel = document.createElement("div");
  pixel.addEventListener("mouseover", draw);
  pixel.classList.add("pixel");
  screen.appendChild(pixel);
}

function draw(event) {
  event.target.classList.add("darker");
}

function clear() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => pixel.classList.remove("darker"));
}
