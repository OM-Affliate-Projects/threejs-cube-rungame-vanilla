import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class Player {
  constructor(game, animate) {
    this.game = game;
    this.animate = animate;
    this.scene = game.scene;
    this.load();
  }
  load() {
    const loader = new GLTFLoader();
    loader.load(
      "./assest/eve.glb",
      (gltf) => {
 console.log(gltf),
        //   console.log("modelLoaded");
        this.scene.add(gltf.scene);
        this.playerChar = gltf.scene;
        this.playerChar.position.set(0, 0, 0);
      },

      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% Loaded");
      },

    //   (error) => {
    //     console.error("ups", error);
    //   }
    );
  }
}

export { Player };
