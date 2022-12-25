const root = document.documentElement;
const screenSize = 16;
root.style.setProperty("--screen-size", screenSize);

const screen = document.querySelector("#screen");

const screenSizeSquared = screenSize * screenSize;
for (let i = 1; i <= screenSizeSquared; i++) {
  let pixel = document.createElement("div");
  pixel.classList.add("pixel");
  screen.appendChild(pixel);
}
