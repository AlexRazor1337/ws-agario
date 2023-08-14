export const checkForOrbCollisions = (pData, pConfig, orbs, settings) => {
    //ORB COLLISIONS
    for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        // AABB Test(square)  - Axis-aligned bounding boxes

        if (pData.x + pData.radius + orb.radius > orb.x
            && pData.x < orb.x + pData.radius + orb.radius
            && pData.y + pData.radius + orb.radius > orb.y
            && pData.y < orb.y + pData.radius + orb.radius) {
            // Pythagoras test(circle)
            const distance = Math.sqrt(
                ((pData.x - orb.x) * (pData.x - orb.x)) +
                ((pData.y - orb.y) * (pData.y - orb.y))
            );
            if (distance < pData.radius + orb.radius) {
                //COLLISION!!!
                pData.score += 1; //incrament score
                pData.orbsAbsorbed += 1; //incrament orbs absorbed count
                // pData.color = orb.color;
                if (pConfig.zoom > 1) {
                    pConfig.zoom -= .001; //update zoom so player doesn't get to big for screen
                }
                pData.radius += 0.1; //increase player size
                if (pConfig.speed < -0.005) {
                    pConfig.speed += 0.005; //increase player speed
                } else if (pConfig.speed > 0.005) {
                    pConfig.speed -= 0.005;
                }
                // can't hit more than one orb on a tock so break and return
                return i;
            }
        }
    };

    return null
}

export const checkForPlayerCollisions = (pData, pConfig, players, playersForUsers, playerId) => {
    //PLAYER COLLISIONS	
    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        if (p.socketId && p.socketId != playerId) { //Added p.socketId test in case player has been removed from players
            let px = p.playerData.x
            let py = p.playerData.y
            let pR = p.playerData.radius
            // AABB Test - Axis-aligned bounding boxes
            if (pData.x + pData.radius + pR > px
                && pData.x < px + pData.radius + pR
                && pData.y + pData.radius + pR > py
                && pData.y < py + pData.radius + pR) {
                // console.log("Hit square test!");
                // Pythagoras test
                const distance = Math.sqrt(
                    ((pData.x - px) * (pData.x - px)) +
                    ((pData.y - py) * (pData.y - py))
                );
                if (distance < pData.radius + pR && pData.radius > pR) {
                    pData.score += (p.playerData.score + 10);
                    pData.playersAbsorbed += 1;
                    p.alive = false;
                    pData.radius += p.playerData.radius * 0.25
                    const collisionData = {
                        absorbed: p.playerData.name,
                        absorbedBy: pData.name,
                    }

                    if (pConfig.zoom > 1) {
                        pConfig.zoom -= (pR * 0.25) * .001;
                    }
                    players.splice(i, 1, {});
                    playersForUsers.splice(i, 1, {})
                    return collisionData;
                }
            }
        }
    }
    return null;
}
