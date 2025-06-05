const keys = {};
const focalLength = 900;
const cameraSpeed = 5;

let lines = [];
let cubes = [];
let canvas, ctx, camera;

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height / 2);

    camera = new Camera();

    let pointA = new Point3D(0, 0, 0);
    let pointB = new Point3D(0, 0, 100);
    lines.push(new Line(pointA, pointB, 'red'));

    pointA = new Point3D(0, 0, 0);
    pointB = new Point3D(0, 100, 0);
    lines.push(new Line(pointA, pointB, 'blue'));

    pointA = new Point3D(0, 0, 0);
    pointB = new Point3D(100, 0, 0);
    lines.push(new Line(pointA, pointB, 'green'));

    pointA = new Point3D(100, 100, 300);
    cubes.push(new Cube(pointA, 100));

    pointA = new Point3D(200, 200, 200);
    cubes.push(new Cube(pointA, 100, ['#00bfff', '#ff69b4', '#7fff00', '#ff8c00', '#8a2be2', '#00ced1']));

    let lastMouseX, lastMouseY;
    let mouseActive = false;


    canvas.addEventListener('click', () => {
        window.focus(); // Ensure window is focused
        canvas.requestPointerLock();
    });

    function onMouseMove(e) {
        const dx = e.movementX;
        const dy = e.movementY;
        camera.rotateY(dx * 0.005); // Adjust sensitivity as needed
        camera.rotateX(dy * -0.005);
    }

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === canvas) {
            document.addEventListener('mousemove', onMouseMove, false);
        } else {
            document.removeEventListener('mousemove', onMouseMove, false);
                for (const key in keys) {
                    keys[key] = false;
                }
        }
    });

    function draw() {
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        movementKeyCheck();
        cubes[0].getMesh();
        cubes[1].getMesh();
        for (const cube of cubes){
            //cube.rotatePitch(0.01);
            //cube.rotateYaw(0.01);
            cube.rotateVerticesPitch(0.01);
            cube.rotateVerticesYaw(0.01);
            cube.draw(ctx, camera);
        }
        for (const line of lines) {
            line.render(camera);
            line.draw(ctx);
        }
        requestAnimationFrame(draw);
    }

    draw();

    function movementKeyCheck() {
        //console.log(camera.direction);
        //console.log(camera.position);
        if (keys['w']) camera.moveForward(cameraSpeed);
        if (keys['s']) camera.moveForward(-cameraSpeed);

        if (keys['d']) camera.moveRight(cameraSpeed);
        if (keys['a']) camera.moveRight(-cameraSpeed);

        if (keys[' ']) camera.moveUp(cameraSpeed);
        if (keys['shift']) camera.moveUp(-cameraSpeed);

        if (keys['arrowup']) camera.rotateX(0.05);
        if (keys['arrowdown']) camera.rotateX(-0.05);
        if (keys['arrowleft']) camera.rotateY(-0.05);
        if (keys['arrowright']) camera.rotateY(0.05);
    }
}

window.onload = main;