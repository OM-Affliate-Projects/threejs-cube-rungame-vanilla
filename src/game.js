import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Box } from "./box";
import { boxCollision } from "./utils";
import { Keys } from "./keys";
import { Player } from "./playerCharacter";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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
    //Orbit Controls for debugging
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //Player Cube
    this.cube = new Box({
      width: 1,
      height: 1,
      depth: 1,
      velocity: { x: 0, y: -0.01, z: 0 },
    });
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    //Player Character Load
    this.newPlayer = new Player(this, this.animate.bind(this));
    // console.log(this.newPlayer);
    // // this.scene.add(this.newPlayer);
    // this.newPlayer.load()

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
    // Keys class with keyHandler
    this.keys = new Keys();
    //Declaring Enemies array,Frames and the spawnrate
    this.enemies = [];
    this.frames = 0;
    this.spawnRate = 200;
    this.camera.position.z = 5;
    this.keys.keyHandler();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  //Animate Method firing every frame
  animate() {
    const animationId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    // Update cube
    this.cube.velocity.x = 0;
    this.cube.velocity.z = 0;
    if (this.keys.keys.a.pressed) this.cube.velocity.x = -0.05;
    if (this.keys.keys.d.pressed) this.cube.velocity.x = 0.05;
    if (this.keys.keys.s.pressed) this.cube.velocity.z = 0.05;
    if (this.keys.keys.w.pressed) this.cube.velocity.z = -0.05;
    if (this.keys.keys.space.pressed) this.cube.velocity.y = 0.12;
    this.cube.update(this.ground);
    // Update enemies and check collisions
    this.enemies.forEach((enemy) => {
      enemy.update(this.ground);
      if (boxCollision({ box1: this.cube, box2: enemy })) {
        cancelAnimationFrame(animationId);
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
  }

  //Render Method
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
export { Game };
