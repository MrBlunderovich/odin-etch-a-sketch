const root = document.documentElement;
const screenSize = 32;
const screen = document.querySelector("#screen");
const screenSizeSquared = screenSize * screenSize;

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
