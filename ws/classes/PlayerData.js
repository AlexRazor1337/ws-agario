export class PlayerData {
    constructor(playerName, settings) {
        this.name = playerName;
        this.x = Math.floor(settings.worldWidth * Math.random() + 55);
        this.y = Math.floor(settings.worldHeight * Math.random() + 55);
        this.radius = settings.orbRadius;
        this.color = this.getRandomColor();
        this.score = 0;
        this.orbsAbsorbed = 0;
        this.playersAbsorbed = 0;
    }

    getRandomColor() {
        const r = Math.floor((Math.random() * 200) + 50)
        const g = Math.floor((Math.random() * 200) + 50)
        const b = Math.floor((Math.random() * 200) + 50)
        return `rgb(${r},${g},${b})`
    }
}
