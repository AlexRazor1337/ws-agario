export class Orb{
    constructor(settings = { worldWidth: 1000, worldHeight: 1000, orbRadius: 5 }){
        this.color = this.getRandomColor()
        this.locX = Math.floor(Math.random() * settings.worldWidth)
        this.locY = Math.floor(Math.random() * settings.worldHeight)
        this.radius = settings.orbRadius;
    }

    getRandomColor(){
        const r = Math.floor((Math.random() * 200) + 50)
        const g = Math.floor((Math.random() * 200) + 50)
        const b = Math.floor((Math.random() * 200) + 50)
        return `rgb(${r},${g},${b})`
    }

}
