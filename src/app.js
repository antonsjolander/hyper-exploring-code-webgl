import * as THREE from "three";
const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75, //fov(Field of view)
	window.innerWidth / window.innerHeight, // Aspecr Ratio
	0.1, // Near Clipping Plane
	1000 // Far clipping plane
);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xfff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// const ambientLight = new THREE.AmbientLight(0xfe78);
// scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xe534eb, 0, 10);
const sphere = new THREE.SphereGeometry(0.1, 16, 8);
pointLight.add(
	new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xe534eb }))
);
pointLight.position.set(-2, 1, 2);
scene.add(pointLight);
camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
let lightsOn = false;
window.addEventListener("click", () => {
	lightsOn = !lightsOn;
	pointLight.intensity = lightsOn ? 2 : 0;
});

window.addEventListener("resize", resize);

animate();
