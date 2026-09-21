import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { loadTexture } from "../utils/textureLoader.js";

export class Moon {
  constructor(geometry) {
    const material = new THREE.MeshStandardMaterial({
      map: loadTexture("/textures/2k_moon.jpg"),
      roughness: 0.9,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.setScalar(CONFIG.moon.scale);
    this.mesh.position.x = CONFIG.moon.distance;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  update(elapsedTime) {
    this.mesh.position.x =
      Math.sin(elapsedTime * CONFIG.moon.orbitSpeed) * CONFIG.moon.distance;
    this.mesh.position.z =
      Math.cos(elapsedTime * CONFIG.moon.orbitSpeed) * CONFIG.moon.distance;
  }
}
