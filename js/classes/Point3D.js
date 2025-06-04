/**
 * Class representing a point in 3D space.
 */
class Point3D {
    /**
     * Create a 3D point.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} z - The z-coordinate.
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Subtract camera position for camera-relative movement
    translate(position) {
        return new Point3D(this.x - position.x, this.y - position.y, this.z - position.z);
    }

    rotateYaw(yaw) {
        const cosYaw = Math.cos(-yaw);
        const sinYaw = Math.sin(-yaw);
        const x = cosYaw * this.x - sinYaw * this.z;
        const z = sinYaw * this.x + cosYaw * this.z;
        return new Point3D(x, this.y, z);
    }

    rotatePitch(pitch) {
        const cosPitch = Math.cos(-pitch);
        const sinPitch = Math.sin(-pitch);
        const y = cosPitch * this.y - sinPitch * this.z;
        const z = sinPitch * this.y + cosPitch * this.z;
        return new Point3D(this.x, y, z);
    }

    // Perspective projection (uncomment for 3D effect)
    // project() {
    //     const focalLength = 300;
    //     const z = this.z === 0 ? 0.0001 : this.z;
    //     return new Point2D((this.x * focalLength) / z, (this.y * focalLength) / z);
    // }

    // Orthographic projection
    project() {
        return new Point2D(this.x, this.y);
    }

    // Perspective projection
    projectPerspective() {
        const z = this.z === 0 ? -0.0001 : this.z; // Prevent division by zero
        const px = (focalLength * this.x) / -z;
        const py = (focalLength * this.y) / -z;

        return new Point2D(px, py);
    }

    render(camera) {
        let p = this.translate(camera.position);
        p = p.rotateYaw(camera.yaw);
        p = p.rotatePitch(camera.pitch);
        if (p.z >= 0) return 0; // Prevent division by zero
        return p.projectPerspective();
    }

    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        if (length === 0) return new Point3D(0, 0, 0);
        return new Point3D(this.x / length, this.y / length, this.z / length);
    }
}