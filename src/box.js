import * as THREE from "three";
import { boxCollision } from "./utils";

class Box extends THREE.Mesh {
            constructor({
              width,
              height,
              depth,
              color = "#00ff00",
              velocity = { x: 0, y: 0, z: 0 },
              position = { x: 0, y: 0, z: 0 },
              gravity = -0.005,
              zAcceleration = false,
            }) {
              super(
                new THREE.BoxGeometry(width, height, depth),
                new THREE.MeshStandardMaterial({ color })
              );
              this.width = width;
              this.height = height;
              this.depth = depth;
              this.gravity = gravity;
              this.velocity = velocity;
          
              this.position.set(position.x, position.y, position.z);
          
              this.front = this.position.z + this.depth / 2;
              this.back = this.position.z - this.depth / 2;
              this.left = this.position.x - this.width / 2;
              this.right = this.position.x + this.width / 2;
              this.bottom = this.position.y - this.height / 2;
              this.top = this.position.y + this.height / 2;
          
              this.zAcceleration = zAcceleration;
            }
          
            updateSides() {
              this.front = this.position.z + this.depth / 2;
              this.back = this.position.z - this.depth / 2;
              this.left = this.position.x - this.width / 2;
              this.right = this.position.x + this.width / 2;
              this.bottom = this.position.y - this.height / 2;
              this.top = this.position.y + this.height / 2;
            }
          
            update(ground) {
              this.updateSides();
              if (this.zAcceleration) this.velocity.z += 0.001;
              this.position.x += this.velocity.x;
              this.position.z += this.velocity.z;
              this.applyGravity(ground);
            }
          
            applyGravity(ground) {
              this.velocity.y += this.gravity;
              if (boxCollision({ box1: this, box2: ground })) {
                const friction = 0.5;
                this.velocity.y *= friction;
                this.velocity.y = -this.velocity.y;
              } else {
                this.position.y += this.velocity.y;
              }
            }
          }
export {Box}