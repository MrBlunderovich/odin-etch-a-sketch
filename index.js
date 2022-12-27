const root = document.documentElement;
const screenSize = 32;
const screen = document.querySelector("#screen");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");
const blackBtn = document.querySelector("#black");
const progressiveBtn = document.querySelector("#progressive");
const rainbowBtn = document.querySelector("#rainbow");
let mode = "black";

clearBtn.addEventListener("click", clear);
sizeBtn.addEventListener("click", changeSize);
blackBtn.addEventListener("click", changeMode);
progressiveBtn.addEventListener("click", changeMode);
rainbowBtn.addEventListener("click", changeMode);

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

function changeMode(event) {
  mode = event.target.id;
  console.log(mode);
}

function draw(event) {
  switch (mode) {
    case "black":
      event.target.style.backgroundColor = "rgb(0,0,0)";
      break;
    case "progressive":
      event.target.style.backgroundColor = progressiveColor(event);
      break;
    case "rainbow":
      event.target.style.backgroundColor = randomColor();
      break;
    default:
      break;
  }
  //event.target.classList.add("darker");
  //console.log(event.target.style.backgroundColor);
}

function clear() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style = "";
  });
}

function changeSize() {
  let newSize = 0;
  do {
    newSize = +prompt("Choose a grid size 10 to 100 pixels");
  } while (newSize < 10 || newSize > 100);
  createPixels(newSize);
}

/* function randomHex() {
  let hexaDecimal = Math.floor(Math.random() * 255).toString(16);
  if (hexaDecimal.length === 1) {
    hexaDecimal = "0" + hexaDecimal;
  }
  return hexaDecimal;
} */
function randomRgbValue() {
  return Math.floor(Math.random() * 255);
}

function randomColor() {
  return `rgb(${randomRgbValue()}, ${randomRgbValue()}, ${randomRgbValue()})`;
}

function progressiveColor(event) {
  const bgColor = event.target.style.backgroundColor;
  console.log(`bgColor:   ${bgColor}`);
  let newColor = "";
  if (bgColor === "") {
    newColor = "hsl(0,0%,90%)"; //hsl
  } else if (bgColor) {
    newColor = incrementHsl(bgColor);
  }
  return newColor;
}

function incrementHsl(rgbString) {
  const match = rgbString.match(/(\d+), (\d+), (\d+)/);
  const r = match[1];
  const g = match[2];
  const b = match[3];
  const hslArrayRaw = RGBToHSL(r, g, b);
  const hslArray = hslArrayRaw.map((item) => Math.round(item));
  if (hslArray[2] > 10) {
    hslArray[2] -= 10;
  }
  return `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%)`;
}
//borrowed function from the internet
function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}
