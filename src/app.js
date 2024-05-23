import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const texture = new THREE.TextureLoader().load("")
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, 5 );
controls.update();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color: 'hotpink', metalness: 1, roughness: 1});
const cube = new THREE.Mesh(geometry, material);

//Light
const light = new THREE.AmbientLight( 'white', 10 ); // soft white light
const pointLight = new THREE.PointLight( 'white', 1, 100 );
const pointLight2 = new THREE.PointLight( 'blue', 1, 100 );

pointLight.position.set( 0.5, 0, 1 );
pointLight2.position.set( -0.5, 0, 1 );

const sphereSize = 0.1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
scene.add( pointLightHelper, pointLightHelper2 );


cube.position.x = 0

scene.add(cube, pointLight, pointLight2, light);

camera.position.z = 5;

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix()
}

window.addEventListener('resize', resize)

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    controls.update();


    renderer.render(scene, camera);
}

animate();
