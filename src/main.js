import { SolarSystem } from "./SolarSystem.js";

const canvas = document.querySelector("canvas.threejs");
const app = new SolarSystem(canvas);
app.start();
