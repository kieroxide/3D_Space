class Cube {
    constructor(midpoint, size, facecolours = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta']) {
        this.midpoint = midpoint;
        this.size = size;
        this.facecolors = facecolours;
        this.vertices = this.calculateMeshVertices();
        
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        this.Faces = []
        this.mesh = this.getMesh();
    }
    rotatePitch(angle) {
        for (const triangle of this.mesh) {
            triangle.pointA = triangle.pointA.rotateYaw(angle);
            triangle.pointB = triangle.pointB.rotateYaw(angle);
            triangle.pointC = triangle.pointC.rotateYaw(angle);
        }
    }

    rotateYaw(angle) {
        for (const triangle of this.mesh) {
            triangle.pointA.rotatePitch(angle);
            triangle.pointB.rotatePitch(angle);
            triangle.pointC.rotatePitch(angle);
        }
    }

    translate(dVector) {
        for (const triangle of this.mesh) {
            triangle.translate(dVector);
        }
    }
    getLines() {
        for (const edge of this.edges) {
            const start = this.vertices[edge[0]];
            const end = this.vertices[edge[1]];
            //lines.push(new Line(start, end, this.color));
        }
    }

    calculateMeshVertices() {
        const halfSize = this.size / 2;
        return [
            new Point3D(this.midpoint.x - halfSize, this.midpoint.y - halfSize, this.midpoint.z - halfSize),
            new Point3D(this.midpoint.x + halfSize, this.midpoint.y - halfSize, this.midpoint.z - halfSize),
            new Point3D(this.midpoint.x + halfSize, this.midpoint.y + halfSize, this.midpoint.z - halfSize),
            new Point3D(this.midpoint.x - halfSize, this.midpoint.y + halfSize, this.midpoint.z - halfSize),
            new Point3D(this.midpoint.x - halfSize, this.midpoint.y - halfSize, this.midpoint.z + halfSize),
            new Point3D(this.midpoint.x + halfSize, this.midpoint.y - halfSize, this.midpoint.z + halfSize),
            new Point3D(this.midpoint.x + halfSize, this.midpoint.y + halfSize, this.midpoint.z + halfSize),
            new Point3D(this.midpoint.x - halfSize, this.midpoint.y + halfSize, this.midpoint.z + halfSize)
        ];
    }

    getMesh() {
        const v = this.vertices;
        const c = this.color;
        const colors = this.facecolors;
        return [
            // Front Face (z+)
            new Face([
                new Triangle(v[4], v[5], v[6], colors[0]),
                new Triangle(v[4], v[6], v[7], colors[0])
            ], colors[0]),
            // Back Face (z-)
            new Face([
                new Triangle(v[0], v[1], v[2], colors[1]),
                new Triangle(v[0], v[2], v[3], colors[1])
            ], colors[1]),
            // Left Face (x-)
            new Face([
                new Triangle(v[0], v[4], v[7], colors[2]),
                new Triangle(v[0], v[7], v[3], colors[2])
            ], colors[2]),
            // Right Face (x+)
            new Face([
                new Triangle(v[1], v[5], v[6], colors[3]),
                new Triangle(v[1], v[6], v[2], colors[3])
            ], colors[3]),
            // Top Face (y+)
            new Face([
                new Triangle(v[3], v[2], v[6], colors[4]),
                new Triangle(v[3], v[6], v[7], colors[4])
            ], colors[4]),
            // Bottom Face (y-)
            new Face([
                new Triangle(v[0], v[1], v[5], colors[5]),
                new Triangle(v[0], v[5], v[4], colors[5])
            ], colors[5])
        ];
    }

    draw(ctx, camera) {
        this.sortFacesByDistance(camera);
        for (const Face of this.mesh) {
            Face.draw(ctx, camera);
        }
    }
    sortFacesByDistance(camera) {
        // Sort faces based on the distance from the camera to the midpoint of each face
        this.mesh.sort((a, b) => {
            const distA = a.distanceFrom(camera);
            const distB = b.distanceFrom(camera);
            return distB - distA; // Draw farthest faces first
        });
    }
    rotateVerticesYaw(angle) {
        // Rotate all vertices around the Y axis (vertical), relative to midpoint
        for (const v of this.vertices) {
            const x = v.x - this.midpoint.x;
            const z = v.z - this.midpoint.z;
            const newX = x * Math.cos(angle) - z * Math.sin(angle);
            const newZ = x * Math.sin(angle) + z * Math.cos(angle);
            v.x = newX + this.midpoint.x;
            v.z = newZ + this.midpoint.z;
        }
        this.mesh = this.getMesh(); // Update mesh after rotation
    }

    rotateVerticesPitch(angle) {
        // Rotate all vertices around the X axis (horizontal), relative to midpoint
        for (const v of this.vertices) {
            const y = v.y - this.midpoint.y;
            const z = v.z - this.midpoint.z;
            const newY = y * Math.cos(angle) - z * Math.sin(angle);
            const newZ = y * Math.sin(angle) + z * Math.cos(angle);
            v.y = newY + this.midpoint.y;
            v.z = newZ + this.midpoint.z;
        }
        this.mesh = this.getMesh(); // Update mesh after rotation
    }
}