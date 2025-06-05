class Mesh{
    constructor(){
        this.triangles = [];
    }

    draw(){
        for (const triangle of this.triangles) {
            triangle.draw();
        }
    }
}