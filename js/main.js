import { Pilota } from "./pilota.js";

// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// funció per generar un número aleatori entre dues xifres
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// funció per generar un color aleatori
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


// array pilotes

const pilotes = [];

for (let i = 0; i < 25; i++) {
  const mida = random(10, 20);
  const x = random(mida, width - mida);
  const y = random(mida, height - mida);
  const velX = random(-4, 4) || 1;
  const velY = random(-4, 4) || 1;
  const color = randomRGB();

  pilotes.push(new Pilota(x, y, velX, velY, color, mida));
}

function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < pilotes.length; i++) {
    pilotes[i].dibuixa(ctx);
    pilotes[i].mou(width, height);
    for (let j = i + 1; j < pilotes.length; j++) {
      pilotes[i].colisio(pilotes[j]);
    }
  }
  
  requestAnimationFrame(loop);
}

loop();