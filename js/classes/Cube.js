class Cube {
    constructor(midpoint, size, colour = 'black') {
        this.midpoint = midpoint;
        this.size = size;
        this.color = colour;

        this.vertices = this.calculateVertices();
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];
    }

    getLines() {
        for (const edge of this.edges) {
            const start = this.vertices[edge[0]];
            const end = this.vertices[edge[1]];
            lines.push(new Line(start, end, this.color));
        }
    }

    calculateVertices() {
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
}