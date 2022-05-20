import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import gsap from 'gsap';
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
// const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)

// // Material
// const material = new THREE.ShaderMaterial({
//     uniforms: {
//         uTime: {value: 0},
//     },
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader,
//     side: THREE.DoubleSide
// })

// // Mesh
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// class CustomSinCurve extends THREE.Curve {

//     constructor(scale = 1) {

//         super();

//         this.scale = scale;

//     }

//     getPoint(t, optionalTarget = new THREE.Vector3()) {

//         const tx = t * 3 - 1.5;
//         const ty = Math.sin(2 * Math.PI * t);
//         const tz = 0;

//         return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);

//     }

// }

function range(min, max) {
    return Math.random() * (max - min) + min;
}

let number = 100;

for (let i = 0; i < number; i++) {
    let level = range(-3, 3);
    let precision = 100;
    let rad = 80;
    let spline = [];

    for (let j = 0; j <= precision; j++) {
        let x = rad * Math.sin(2 * Math.PI * j / precision);
        let z = rad * Math.cos(2 * Math.PI * j / precision);
        spline.push(new THREE.Vector3(x, 0, z));
    }
    let sampleClosedSpline = new THREE.CatmullRomCurve3(spline);

    let params = {
        scale: 4,
        extrusionSegments: 400,
        radiusSegments: 16,
        closed: false,
    };

    let tubeGeometry = new THREE.TubeBufferGeometry(sampleClosedSpline, params.extrusionSegments, 2, params.radiusSegments, params.closed);

    let mesh = new THREE.Mesh(tubeGeometry, new THREE.MeshNormalMaterial());

    scene.add(mesh);
    mesh.position.set(0, level, 0);
    mesh.scale.set(0.01, 0.01, 0.01);
}

// const path = new CustomSinCurve(10);
// const geometry = new THREE.TubeGeometry(path, 20, 2, 8, false);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 10, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();

    // Update uniforms
    // material.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();