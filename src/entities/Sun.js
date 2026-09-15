import * as THREE from "three";
import { CONFIG } from "../config/constants.js";
import { loadTexture } from "../utils/textureLoader.js";

export class Sun {
  constructor(geometry) {
    const sunTexture = loadTexture("/textures/2k_sun.jpg");

    this.material = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissiveMap: sunTexture,
      emissive: new THREE.Color(CONFIG.sun.emissiveColor),
      emissiveIntensity: 1.4,
      roughness: 1,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.scale.setScalar(CONFIG.sun.scale);
  }

  update(elapsedTime) {
    // Rotation
    this.mesh.rotation.y += 0.001;

    // Emissive pulsation effect
    const sunBurnIntensityFactor = Math.sin(elapsedTime);
    this.material.emissiveIntensity = 0.85 + Math.abs(sunBurnIntensityFactor);
  }
}
