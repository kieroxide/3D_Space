const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function main(){
    // Canvas setup
    lines = [];
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    const camera = new Camera();
    let pointA = new Point3D(0, 0, 0);
    let pointB = new Point3D(0, 0, 100);
    lines.push(new Line(pointA, pointB,'red'));

    pointA = new Point3D(0, 0, 0);
    pointB = new Point3D(0, 100, 0);
    lines.push(new Line(pointA, pointB,'blue'));

    pointA = new Point3D(0, 0, 0);
    pointB = new Point3D(100, 0, 0);
    lines.push(new Line(pointA, pointB,'green'));

    ctx.translate(canvas.width / 2, canvas.height / 2);

    function draw(){
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        movementKeyCheck();
        for (let i = 0; i < lines.length; i++) {
            lines[i].render(camera);
            lines[i].draw(ctx);
        }
        requestAnimationFrame(draw);
    }
        
    draw();
    function movementKeyCheck(){
        if (keys['w']) camera.moveForward(1);
        if (keys['s']) camera.moveForward(-1);

        if (keys['d']) camera.moveRight(1);
        if (keys['a']) camera.moveRight(-1);

        if (keys[' ']) camera.moveUp(1);
        if (keys['shift']) camera.moveUp(-1);

        if( keys['arrowup']) camera.rotateX(0.05);
        if( keys['arrowdown']) camera.rotateX(-0.05);
        if( keys['arrowleft']) camera.rotateY(0.05);
        if( keys['arrowright']) camera.rotateY(-0.05);
    }
}

window.onload = main;