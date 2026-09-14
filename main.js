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
camera.position.set(0, 0, 20);

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
// Note: TorusKnotGeometry accepts parameters: radius, tube, tubularSegments, radialSegments
const cubeGeo = new THREE.TorusKnotGeometry(2, 0.6, 128, 32);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff, // Standard hex format instead of string "cyan"
  roughness: 0.3,
  metalness: 0.2,
});
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
scene.add(cubeMesh);

// 5. Lighting Setup
const pointLight = new THREE.PointLight(0xffaaff, 100, 0, 2); // Color, intensity, distance, decay
pointLight.position.set(15, 1, 1);

const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
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
  const elapsedTime = currentTime * 0.001;

  cubeMesh.rotation.y = elapsedTime * 0.8;
  cubeMesh.rotation.x = elapsedTime * 0.4;

  controls.update(); // Required when enableDamping is true
  renderer.render(scene, camera);
});
