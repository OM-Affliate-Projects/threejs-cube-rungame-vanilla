import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Box } from "./box";
import { boxCollision } from "./utils";

class Game {
  constructor() {
    const container = document.createElement("div");

    document.body.appendChild(container);
    this.scene = new THREE.Scene();
    //Window Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    //Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    console.log(this.camera);
    //Camera Position
    this.camera.position.set(4.61, 2.74, 8);
    //Init Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(sizes.width, sizes.height);
    //Appending The Renderer to the dom Element
    container.appendChild(this.renderer.domElement);
    console.log(this.renderer);
    //Orbit Controls for debugging
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //Test Cube
    const testGeo = new THREE.BoxGeometry();
    const testMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(testGeo, testMat);
    this.scene.add(this.mesh);
    console.log(this.mesh);
    //Player Cube
    this.cube = new Box({
      width: 1,
      height: 1,
      depth: 1,
      velocity: { x: 0, y: -0.01, z: 0 },
    });
    this.cube.castShadow = true;
    this.scene.add(this.cube);
    //The Ground
    this.ground = new Box({
      width: 10,
      height: 0.5,
      depth: 50,
      color: "#3b82f6",
      position: { x: 0, y: -2, z: 0 },
    });

    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    //Direct Light Source
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.y = 3;
    light.position.z = 2;
    light.castShadow = true;
    this.scene.add(light);
    //An ambient light source
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    //Keys Object
    this.keys = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
    };
    //Declaring Enemies array,Frames and the spawnrate
    this.enemies = [];
    this.frames = 0;
    this.spawnRate = 200;
    this.camera.position.z = 5;
    this.keyHandler();
    this.animate = this.animate.bind(this);
    this.animate();
  }
  //Resize Mehtod
  resize() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(sizes.width, sizes.height);
  }
  //Animate Method firing every frame
  animate() {
    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);

    // Update cube
    this.cube.velocity.x = 0;
    this.cube.velocity.z = 0;
    if (this.keys.a.pressed) this.cube.velocity.x = -0.05;
    if (this.keys.d.pressed) this.cube.velocity.x = 0.05;
    if (this.keys.s.pressed) this.cube.velocity.z = 0.05;
    if (this.keys.w.pressed) this.cube.velocity.z = -0.05;

    this.cube.update(this.ground);

    // Update enemies and check collisions
    this.enemies.forEach((enemy) => {
      enemy.update(this.ground);
      if (boxCollision({ box1: this.cube, box2: enemy })) {
        cancelAnimationFrame(this.animate);
      }
    });
    //Declaration für enemies frames und spawn nicht in animate weil animate jeder frame neu ist aka reset
    // Spawn enemies
    if (this.frames % this.spawnRate === 0) {
      if (this.spawnRate > 20) this.spawnRate -= 20;
      const enemy = new Box({
        width: 1,
        height: 1,
        depth: 1,
        color: "#ff0000",
        position: { x: (Math.random() - 0.5) * 10, y: 0, z: -20 },
        velocity: { x: 0, y: 0, z: 0.01 },
        zAcceleration: true,
      });
      enemy.castShadow = true;
      this.scene.add(enemy);
      this.enemies.push(enemy);
      //If statement to delete unnecessary enemies
      if (this.enemies.length > 50) {
        const deleteEnemy = this.enemies.shift();
        this.scene.remove(deleteEnemy);
      }
    }
    this.frames++;
    console.log(this.enemies.length);
  }
  //Keyhandler Method
  keyHandler() {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
          keys.a.pressed = true;
          break;
        case "KeyD":
          keys.d.pressed = true;
          break;
        case "KeyS":
          keys.s.pressed = true;
          break;
        case "KeyW":
          keys.w.pressed = true;
          break;
        case "Space":
          cube.velocity.y = 0.12;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyA":
          keys.a.pressed = false;
          break;
        case "KeyD":
          keys.d.pressed = false;
          break;
        case "KeyS":
          keys.s.pressed = false;
          break;
        case "KeyW":
          keys.w.pressed = false;
          break;
      }
    });
  }
  //Render Method
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
export { Game };
