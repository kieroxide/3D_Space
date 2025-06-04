/**
 * 3D free-fly camera with position and orientation vectors.
 */
class Camera {
    constructor() {
        this.position = new Point3D(0, 0, 1);
        this.direction = new Point3D(0, 0, -1);
        this.up = new Point3D(0, 1, 0);
        this.right = new Point3D(1, 0, 0);
    }

    /** Move forward/backward */
    moveForward(mag) {
        this.position.x += this.direction.x * mag;
        this.position.y += this.direction.y * mag;
        this.position.z += this.direction.z * mag;
    }

    /** Move right/left */
    moveRight(mag) {
        this.position.x += this.right.x * mag;
        this.position.y += this.right.y * mag;
        this.position.z += this.right.z * mag;
    }

    /** Move up/down */
    moveUp(mag) {
        this.position.x += this.up.x * mag;
        this.position.y += this.up.y * mag;
        this.position.z += this.up.z * mag;
    }
}
