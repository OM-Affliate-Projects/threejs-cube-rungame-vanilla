import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

class Player {
    constructor() {
        const loader = new GLTFLoader()

        loader.load(
            "./src/assest/ReadiedAsset.glb",
            
            function ( gltf ) {
                
            },

            function (xhr) {
                console.log((xhr.loaded/xhr.total * 100)+ "% Loaded");
            },

            function ( error ) {
                console.log("ups");
            }
        )
    }
}

export {Player}