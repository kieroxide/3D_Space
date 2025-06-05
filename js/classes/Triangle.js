class Triangle{
    constructor(pointA, pointB, pointC, colour = 'blue') {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.colour = colour;
        this.projectedPoints = [];
    }
    translate(dVector) {
        this.pointA.translate(dVector);
        this.pointB.translate(dVector);
        this.pointC.translate(dVector);
    }
    draw(ctx, camera){
        this.projectedPoints = [];
        for (const point of [this.pointA, this.pointB, this.pointC]) {
            const projectedPoint = point.render(camera);
            if (projectedPoint === null) {
                return; // Skip rendering if point is behind the camera
            }
            this.projectedPoints.push(new Point2D(projectedPoint.x, projectedPoint.y));
        }
        ctx.beginPath();
        ctx.moveTo(this.projectedPoints[0].x, this.projectedPoints[0].y);
        ctx.lineTo(this.projectedPoints[1].x, this.projectedPoints[1].y);
        ctx.lineTo(this.projectedPoints[2].x, this.projectedPoints[2].y);
        ctx.closePath();
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
    getMidpoint() {
        const midX = (this.pointA.x + this.pointB.x + this.pointC.x) / 3;
        const midY = (this.pointA.y + this.pointB.y + this.pointC.y) / 3;
        const midZ = (this.pointA.z + this.pointB.z + this.pointC.z) / 3;
        return new Point3D(midX, midY, midZ);
    }
}