import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 1. Scene & Camera Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(20, 30, 25);

// 2. Renderer Configuration
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace; // Modern color management

// 3. Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 10;

// 4. Mesh Geometry & Material

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

const textureLoader = new THREE.TextureLoader();

const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace;

const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;

const sunMat = new THREE.MeshStandardMaterial({
  map: sunTexture,
  emissiveMap: sunTexture,
  emissive: new THREE.Color(0xffffaa),
  emissiveIntensity: 1.4,
});
const earthMat = new THREE.MeshStandardMaterial({
  map: earthTexture,
  color: "cyan",
});

const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;
const moonMat = new THREE.MeshStandardMaterial({
  map: moonTexture,
  color: "grey",
});

const sun = new THREE.Mesh(sphereGeo, sunMat);
sun.scale.setScalar(6);

const earth = new THREE.Mesh(sphereGeo, earthMat);
earth.scale.setScalar(2);
earth.position.x = 20;

const moon = new THREE.Mesh(sphereGeo, moonMat);
moon.scale.setScalar(0.25);
moon.position.x = 2;
earth.add(moon);

scene.add(sun, earth);

// 5. Lighting Setup
const pointLight = new THREE.PointLight(0xffffee, 8000, 0, 2); // Color, intensity, distance, decay
// pointLight.position.set(15, 1, 1);

const ambLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(pointLight, ambLight);

// 6. Helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

// 7. Window Resizing Handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", onWindowResize);

// 8. Animation Loop
let previousTime = 0;

renderer.setAnimationLoop((currentTime) => {
  // Delta time ensures rotation speed is frame-rate independent
  const elapsedTime = currentTime * 0.0001;

  earth.rotation.y += 0.04;

  earth.position.x = Math.sin(elapsedTime) * 25;
  earth.position.z = Math.cos(elapsedTime) * 25;

  let sunBurnIntensityFactor = Math.sin(elapsedTime * 8);
  sunMat.emissiveIntensity = 1 + Math.abs(sunBurnIntensityFactor);
  pointLight.intensity += 2 * sunBurnIntensityFactor;

  controls.update(); // Required when enableDamping is true
  renderer.render(scene, camera);
});
