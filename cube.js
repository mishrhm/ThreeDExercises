import * as THREE from "three";

export function cube(scene, camera, renderer) {
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10);
  const material = new THREE.MeshStandardMaterial({
    color: "cyan",
    roughness: 0.4,
    metalness: 0.92,
  });

  const pointLight = new THREE.PointLight(0xffffff, 500);
  const ambLight = new THREE.AmbientLight(0xffffff, 5);
  pointLight.position.set(5, 1, 1);

  scene.add(pointLight, ambLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(pointLightHelper, gridHelper);

  const cubeMesh = new THREE.Mesh(geometry, material);
  scene.add(cubeMesh);

  renderer.setAnimationLoop((time) => {
    cubeMesh.rotation.x = time / 2000;
    cubeMesh.rotation.y = time / 1000;
    renderer.render(scene, camera);
  });
}
