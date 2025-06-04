const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function main(){
    // Canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    const camera = new Camera();
    const pointA = new Point3D(0, 0, 0);
    const pointB = new Point3D(100, 100, 100);
    const line = new Line(pointA, pointB,'red');

    ctx.translate(canvas.width / 2, canvas.height / 2);

    function draw(){
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        movementKeyCheck();
        line.render(camera);
        line.draw(ctx);
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