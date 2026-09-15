import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { loadTexture } from "../utils/textureLoader.js";

export class Earth {
  constructor(geometry) {
    const material = new THREE.MeshStandardMaterial({
      map: loadTexture("/textures/2k_earth_daymap.jpg"),
      roughness: 0.7,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.setScalar(CONFIG.earth.scale);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  update(elapsedTime) {
    this.mesh.position.x =
      Math.sin(elapsedTime * CONFIG.earth.orbitSpeed * 100) *
      CONFIG.earth.distance;
    this.mesh.position.z =
      Math.cos(elapsedTime * CONFIG.earth.orbitSpeed * 100) *
      CONFIG.earth.distance;
    this.mesh.rotation.y += CONFIG.earth.rotationSpeed;
  }
}
