const keys = {};
const focalLength = 100;
const cameraSpeed = 5;

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
    ctx.translate(canvas.width / 2, canvas.height / 2);


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

    pointA = new Point3D(100, 100, 300);
    cube1 = new Cube(pointA, 100);

    pointA = new Point3D(200, 200, 200);
    cube2 = new Cube(pointA, 100, 'purple');

    function draw(){
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        movementKeyCheck();
        cube1.getLines();
        cube2.getLines();
        for (const line of lines) {
            line.render(camera);
            line.draw(ctx);
        }
        requestAnimationFrame(draw);
    }
        
    draw();
    function movementKeyCheck(){
        //console.log(camera.direction);
        console.log(camera.position);
        if (keys['w']) camera.moveForward(cameraSpeed);
        if (keys['s']) camera.moveForward(-cameraSpeed);

        if (keys['d']) camera.moveRight(cameraSpeed);
        if (keys['a']) camera.moveRight(-cameraSpeed);

        if (keys[' ']) camera.moveUp(cameraSpeed);
        if (keys['shift']) camera.moveUp(-cameraSpeed);

        if( keys['arrowup']) camera.rotateX(0.05);
        if( keys['arrowdown']) camera.rotateX(-0.05);
        if( keys['arrowleft']) camera.rotateY(0.05);
        if( keys['arrowright']) camera.rotateY(-0.05);
    }
}

window.onload = main;