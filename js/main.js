function main(){
    // Canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function draw(){
        // Call draw on next frame
        requestAnimationFrame(draw);
    }

    draw(); // Start of loop
}

window.onload = main;