import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function loadTexture(path) {
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
