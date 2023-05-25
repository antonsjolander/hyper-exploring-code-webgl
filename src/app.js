import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
const material = new THREE.MeshStandardMaterial({
	metalness: 1,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 1;
scene.add(cube);
// const ambientLight = new THREE.AmbientLight(0xfe78);
// scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2, 10);
const sphere = new THREE.SphereGeometry(0.1, 15, 15);
pointLight.add(
	new THREE.Mesh(
		sphere,
		new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
	)
);

pointLight.castShadow = true;

const bgTexture = new THREE.TextureLoader().load(
	"./38b4a7d6673ca3009f95755fd993e1f3.jpg"
);

const bgGeometry = new THREE.PlaneGeometry(5, 5);
const bgMaterial = new THREE.MeshStandardMaterial({ map: bgTexture });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.receiveShadow = true;
bgMesh.position.set(0, 0, 0);
bgMesh.rotation.x = -1.6;
scene.add(bgMesh);

pointLight.position.set(0, 3, 0);
scene.add(pointLight);

camera.position.z = 5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

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
pointLight.intensity = 2;
window.addEventListener("click", () => {
	// lightsOn = !lightsOn;
	// pointLight.intensity = lightsOn ? 2 : 0;
});

window.addEventListener("resize", resize);

animate();
