/**
 * Class representing a line in 3D space between two points.
 */
class Line {
    /**
     * Create a 3D line.
     * @param {Point} startPoint - The starting point of the line.
     * @param {Point} endPoint - The ending point of the line.
     * @param {string} lineColour - The colour of the line.
     */
    constructor(startPoint, endPoint, lineColour = 'blue') {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.projectedStart = null;
        this.projectedEnd = null;
        this.lineColour = lineColour;
    }

    render(camera) {
        this.projectedStart = this.startPoint.render(camera);
        this.projectedEnd = this.endPoint.render(camera);
    }

    draw(ctx) {
        if (!(this.projectedEnd || this.projectedStart === null)) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(this.projectedStart.x, this.projectedStart.y);
        ctx.lineTo(this.projectedEnd.x, this.projectedEnd.y);
        ctx.strokeStyle = this.lineColour;
        ctx.stroke();
    }
}
