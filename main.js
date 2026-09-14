import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 20;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

const cubeGeo = new THREE.TorusKnotGeometry(2);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: "cyan" });
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);

scene.add(cubeMesh);

const pointLight = new THREE.PointLight(0xffaaff, 400);
const ambLight = new THREE.AmbientLight(0xffffff, 0.2);
pointLight.position.set(15, 1, 1);

scene.add(pointLight, ambLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

window.addEventListener("resize", (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop((time) => {
  cubeMesh.rotation.y = time * 0.0015;
  controls.update();
  renderer.render(scene, camera);
});
