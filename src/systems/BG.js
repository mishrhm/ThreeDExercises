import * as THREE from "three";
import { loadTexture } from "../utils/textureLoader";

export function createGalaxyBG(scene) {
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath("/textures/cubeMap/");

  const backgroundCubemap = cubeTextureLoader.load([
    "px.webp",
    "nx.webp",
    "py.webp",
    "ny.webp",
    "pz.webp",
    "nz.webp",
  ]);

  scene.background = backgroundCubemap;
}
