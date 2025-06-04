function main(){
    // Canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const pointA = new Point3D(0, 0, 0);
    const pointB = new Point3D(100, 100, 100);
    const line = new Line(pointA, pointB,'red');

    function draw(){
        line.draw(ctx);
        requestAnimationFrame(draw);
    }
    draw(); // Start of loop
}

window.onload = main;