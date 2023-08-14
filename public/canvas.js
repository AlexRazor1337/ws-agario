const init = () => {
    player.x = Math.floor(Math.random() * WW);
    player.y = Math.floor(Math.random() * WH);
    draw();

}



const draw = () => {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const camX = -player.x + canvas.width / 2;
    const camY = -player.y + canvas.height / 2;
    context.translate(camX, camY);
    
    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.stroke();
    
    orbs.forEach((orb) => {
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, 2 * Math.PI);
        context.fill();
    }); 
    
    requestAnimationFrame(draw);
}

init();

canvas.addEventListener('mousemove', (event) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
    if (angleDeg >= 0 && angleDeg < 90) {
        xVector = 1 - (angleDeg / 90);
        yVector = -(angleDeg / 90);
    } else if (angleDeg >= 90 && angleDeg <= 180) {
        xVector = -(angleDeg - 90) / 90;
        yVector = -(1 - ((angleDeg - 90) / 90));
    } else if (angleDeg >= -180 && angleDeg < -90) {
        xVector = (angleDeg + 90) / 90;
        yVector = (1 + ((angleDeg + 90) / 90));
    } else if (angleDeg < 0 && angleDeg >= -90) {
        xVector = (angleDeg + 90) / 90;
        yVector = (1 - ((angleDeg + 90) / 90));
    }

    speed = 10
    xV = xVector;
    yV = yVector;

    if ((player.x < 5 && xV < 0) || (player.x > WW) && (xV > 0)) {
        player.y -= speed * yV;
    } else if ((player.y < 5 && yV > 0) || (player.y > WH) && (yV < 0)) {
        player.x += speed * xV;
    } else {
        player.x += speed * xV;
        player.y -= speed * yV;
    }
})
