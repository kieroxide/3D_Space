/**
 * Class representing a point in 3D space.
 */
class Point3D{
  /**
   * Create a 3D point.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} z - The z-coordinate.
   */
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
   /**
    * Simple orthaogonal projection from 3D to 2D plane.
    *
    * @param {Point3D} point - 3D point
    * @returns {Point2D} - 2D point from projection
    */
    project(){
        return new Point2D(this.x, this.y);
    }
}