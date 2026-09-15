import * as THREE from "three";
import { CONFIG } from "../config/constants.js";

export function createLights(scene) {
  const pointLight = new THREE.PointLight(
    0xffffee,
    CONFIG.lighting.pointIntensity,
    0,
    2,
  );
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.set(2048, 2048);
  pointLight.shadow.bias = -0.0005;

  const ambLight = new THREE.AmbientLight(
    0xffffff,
    CONFIG.lighting.ambientIntensity,
  );

  scene.add(pointLight, ambLight);

  return { pointLight, ambLight };
}
