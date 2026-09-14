import * as THREE from "three";

export function konan(scene, camera, renderer) {
  camera.position.z = 25;

  const radius = 7;
  const widthSegments = 40;
  const heightSegments = 40;
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
  );
  const material = new THREE.PointsMaterial({
    color: "cyan",
    size: 0.3, // in world units
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  renderer.setAnimationLoop((time) => {
    renderer.render(scene, camera);
  });
}
