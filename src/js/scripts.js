import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import starsTexture from "../img/stars.jpg";
import earthTexture from "../img/earth.jpg";
import sunTexture from "../img/sun.jpg";
import jupiterTexture from "../img/jupiter.jpg";
import marsTexture from "../img/mars.jpg";
import mercuryTexture from "../img/mercury.jpg";
import neptuneTexture from "../img/neptune.jpg";
import plutoTexture from "../img/pluto.jpg";
import saturnTexture from "../img/saturn.jpg";
import uranusTexture from "../img/uranus.jpg";
import venusTexture from "../img/venus.jpg";
import uranusringTexture from "../img/uranus ring.png";
import saturnringTexture from "../img/saturn ring.png";
import moonTexture from "../img/moon.jpg";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 250, 250);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);

const texttureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(15, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: texttureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ring) {
    const Geo = new THREE.SphereGeometry(size, 30, 30);
    const Mat = new THREE.MeshStandardMaterial({
        map: texttureLoader.load(texture),
    });
    const mesh = new THREE.Mesh(Geo, Mat);
    const Obj = new THREE.Object3D();
    Obj.add(mesh);
    if (ring) {
        const RingGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );
        const RingMat = new THREE.MeshBasicMaterial({
            map: texttureLoader.load(ring.texture),
            side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(RingGeo, RingMat);
        Obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.4 * Math.PI;
    }
    scene.add(Obj);
    mesh.position.x = position;
    return { mesh, Obj };
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, mercuryTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 13,
    outerRadius: 20,
    texture: saturnringTexture,
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusringTexture,
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xffffff, 10000, 3000000);
scene.add(pointLight);

function animate() {
    // Self rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);
    // around sun rotation
    mercury.Obj.rotateY(0.04);
    venus.Obj.rotateY(0.015);
    earth.Obj.rotateY(0.01);
    mars.Obj.rotateY(0.008);
    jupiter.Obj.rotateY(0.002);
    saturn.Obj.rotateY(0.0009);
    uranus.Obj.rotateY(0.0004);
    neptune.Obj.rotateY(0.0001);
    pluto.Obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
