/**
 * 3D free-fly camera with position and orientation vectors.
 */
class Camera {
    constructor() {
        this.position = new Point3D(0, 0, 1);
        this.direction = new Point3D(0, 0, -1);
        this.up = new Point3D(0, 1, 0);
        this.right = new Point3D(1, 0, 0);
        this.yaw = 0;
        this.pitch = 0;
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

    rotateY(deltaYaw) {
        this.yaw += deltaYaw;
        this.updateVectors();
    }
    rotateX(deltaPitch) {
        this.pitch += deltaPitch;
        const maxPitch = Math.PI / 2 * 0.99;
        if (this.pitch > maxPitch) this.pitch = maxPitch;
        if (this.pitch < -maxPitch) this.pitch = -maxPitch;
        this.updateVectors();
  }

  updateDirection() {
    this.direction = new Point3D(
        Math.cos(this.pitch) * Math.sin(this.yaw),
        Math.sin(this.pitch),
        -Math.cos(this.pitch) * Math.cos(this.yaw)
    );
}

updateRight() {
    this.right = new Point3D(
        Math.cos(this.yaw),
        0,
        -Math.sin(this.yaw)
    );
}

updateUp() {
    // up = right x direction (cross product)
    this.up = new Point3D(
        this.right.y * this.direction.z - this.right.z * this.direction.y,
        this.right.z * this.direction.x - this.right.x * this.direction.z,
        this.right.x * this.direction.y - this.right.y * this.direction.x
    );
}

updateVectors() {
    this.updateDirection();
    this.updateRight();
    this.updateUp();
}


}
