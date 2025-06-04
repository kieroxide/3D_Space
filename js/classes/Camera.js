/**
 * Class representing a point in 2D space.
 */
class Camera{
  /**
   * Create a 2D point.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
    constructor(){
        this.position = new Point3D(0, 0, 100);
        this.direction = new Point3D(0, 0, -1);
        this.up = new Point3D(0, 1, 0);
        this.right = new Point3D(1, 0, 0);
    }

    moveForward(magnitude) {
        this.position.x += this.direction.x * magnitude;
        this.position.y += this.direction.y * magnitude;
        this.position.z += this.direction.z * magnitude;
    }

    moveRight(magnitude) {
        this.position.x += this.right.x * magnitude;
        this.position.y += this.right.y * magnitude;
        this.position.z += this.right.z * magnitude;
    }

    moveUp(magnitude) {
        this.position.x += this.up.x * magnitude;
        this.position.y += this.up.y * magnitude;
        this.position.z += this.up.z * magnitude;
    }
}