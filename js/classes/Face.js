class Face{
    constructor(triangles, colour = 'blue') {
        this.triangles = triangles; // Array of Triangle objects
        this.colour = colour; // Colour of the face
    }
    draw(ctx, camera) {
        for (const triangle of this.triangles) {
            triangle.draw(ctx, camera);
        }
    }
    distanceFrom(camera) {
        // Calculate the distance from the camera to the midpoint of the face
        const midPoint = this.getMidpoint();
        return Math.sqrt(
            Math.pow(midPoint.x - camera.position.x, 2) +
            Math.pow(midPoint.y - camera.position.y, 2) +
            Math.pow(midPoint.z - camera.position.z, 2)
        );
    }

    getMidpoint() {
        // Calculate the midpoint of the face by averaging the midpoints of its triangles
        let sumX = 0, sumY = 0, sumZ = 0;
        for (const triangle of this.triangles) {
            const midPoint = triangle.getMidpoint();
            sumX += midPoint.x;
            sumY += midPoint.y;
            sumZ += midPoint.z;
        }
        const count = this.triangles.length;
        return {
            x: sumX / count,
            y: sumY / count,
            z: sumZ / count
        };
    }

}