import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createRenderer } from "./systems/Renderer.js";
import { createLights } from "./systems/Lights.js";
import { setupResizer } from "./systems/Resizer.js";
import { CONFIG } from "./config/constants.js";
import { Sun } from "./entities/Sun.js"; // Import Sun
import { Earth } from "./entities/Earth.js";
import { Moon } from "./entities/Moon.js";
import { createGalaxyBG } from "./systems/BG.js";

export class SolarSystem {
  constructor(canvas) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(10, 20, 25);

    this.renderer = createRenderer(canvas);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    setupResizer(this.camera, this.renderer);

    createGalaxyBG(this.scene);

    // Save lights reference if you want to animate pointLight intensity with the Sun
    const { pointLight } = createLights(this.scene);
    this.pointLight = pointLight;

    this.sharedGeometry = new THREE.SphereGeometry(1, 64, 64);
    this.initEntities();
  }

  initEntities() {
    this.sun = new Sun(this.sharedGeometry);
    this.earth = new Earth(this.sharedGeometry);
    this.moon = new Moon(this.sharedGeometry);

    // Assembly hierarchy
    this.earth.mesh.add(this.moon.mesh);
    this.scene.add(this.sun.mesh, this.earth.mesh);
  }

  start() {
    this.renderer.setAnimationLoop((currentTime) => {
      const elapsedTime = currentTime * 0.001;

      // Update entities
      this.sun.update(elapsedTime);
      this.earth.update(elapsedTime);
      this.moon.update(elapsedTime);

      // PointLight pulsation matching original behavior
      const sunBurnIntensityFactor = Math.sin(elapsedTime * 8);
      this.pointLight.intensity =
        CONFIG.lighting.pointIntensity + 200 * sunBurnIntensityFactor;

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
}
