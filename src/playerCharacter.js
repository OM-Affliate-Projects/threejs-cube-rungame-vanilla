import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

//Draco loader war notwendig warum auch immer
//der pfad ist ein krampf
class Player {
  constructor(game, animate) {
    this.game = game;
    this.animate = animate;
    this.scene = game.scene;
    this.load();
  }
  load() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "../node_modules/three/examples/jsm/libs/draco/"
    );
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      "../src/assets/ReadiedAsset.glb",
      (gltf) => {
        console.log(gltf),
          //   console.log("modelLoaded");
          this.scene.add(gltf.scene);
        this.playerChar = gltf.scene;
        this.playerChar.position.set(0, -1, 0);
      },

      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% Loaded");
      },

      (error) => {
        console.error("ups", error);
      }
    );
  }
}

export { Player };
