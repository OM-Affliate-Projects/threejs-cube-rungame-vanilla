class Keys {
  constructor() {
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
      space: {
        pressed: false,
      },
    };
  }
  keyHandler() {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA":
          this.keys.a.pressed = true;
          break;
        case "KeyD":
          this.keys.d.pressed = true;
          break;
        case "KeyS":
          this.keys.s.pressed = true;
          break;
        case "KeyW":
          this.keys.w.pressed = true;
          break;
        case "Space":
          this.keys.space.pressed = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyA":
          this.keys.a.pressed = false;
          break;
        case "KeyD":
          this.keys.d.pressed = false;
          break;
        case "KeyS":
          this.keys.s.pressed = false;
          break;
        case "KeyW":
          this.keys.w.pressed = false;
          break;
        case "Space":
          this.keys.space.pressed = false;
      }
    });
  }
}
export { Keys };
