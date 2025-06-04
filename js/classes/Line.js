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
        this.lineColour = lineColour;
    }

    draw(){

    }
}
